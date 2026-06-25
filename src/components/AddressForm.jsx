import React, { useEffect, useRef, useState } from 'react'
import { Home, Briefcase, MapPin, Search, Loader2 } from 'lucide-react'
import useGoogleMaps from '../hooks/useGoogleMaps'

const empty = {
  type: 'home',
  name: '',
  phone: '',
  street: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
  lat: null,
  lng: null,
  isDefault: false,
}

const TYPES = [
  { id: 'home',  label: 'Home',  Icon: Home },
  { id: 'work',  label: 'Work',  Icon: Briefcase },
  { id: 'other', label: 'Other', Icon: MapPin },
]

const AddressForm = ({ initial, onSubmit, onCancel, submitLabel = 'Save Address' }) => {
  const { isLoaded } = useGoogleMaps()
  const autocompleteRef = useRef(null)
  const geocoderRef = useRef(null)
  const [form, setForm] = useState({ ...empty, ...(initial || {}) })
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState([])
  const [resolving, setResolving] = useState(false)

  useEffect(() => {
    if (isLoaded && window.google?.maps?.places) {
      autocompleteRef.current = new window.google.maps.places.AutocompleteService()
      geocoderRef.current = new window.google.maps.Geocoder()
    }
  }, [isLoaded])

  const onSearch = (value) => {
    setQuery(value)
    if (value.length < 3 || !autocompleteRef.current) {
      setPredictions([])
      return
    }
    autocompleteRef.current.getPlacePredictions(
      { input: value, componentRestrictions: { country: 'in' } },
      (preds, status) => {
        if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && preds) {
          setPredictions(preds)
        } else {
          setPredictions([])
        }
      }
    )
  }

  const applyPlace = (components, formatted, location) => {
    let street = ''
    let city = ''
    let state = ''
    let zipCode = ''
    let country = 'India'
    let route = ''
    let streetNumber = ''
    let sublocality = ''

    components.forEach((c) => {
      const t = c.types
      if (t.includes('street_number')) streetNumber = c.long_name
      else if (t.includes('route')) route = c.long_name
      else if (t.includes('sublocality') || t.includes('sublocality_level_1') || t.includes('neighborhood')) sublocality = c.long_name
      else if (t.includes('locality')) city = c.long_name
      else if (t.includes('administrative_area_level_1')) state = c.long_name
      else if (t.includes('postal_code')) zipCode = c.long_name
      else if (t.includes('country')) country = c.long_name
    })

    street = [streetNumber, route, sublocality].filter(Boolean).join(', ') || formatted

    setForm((prev) => ({
      ...prev,
      street,
      city,
      state,
      zipCode,
      country,
      lat: location?.lat?.() ?? location?.lat ?? null,
      lng: location?.lng?.() ?? location?.lng ?? null,
    }))
  }

  const selectPrediction = async (prediction) => {
    if (!geocoderRef.current) return
    setResolving(true)
    try {
      const { results } = await geocoderRef.current.geocode({ placeId: prediction.place_id })
      if (results?.[0]) {
        applyPlace(results[0].address_components, results[0].formatted_address, results[0].geometry?.location)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setResolving(false)
      setQuery(prediction.description)
      setPredictions([])
    }
  }

  const useMyLocation = async () => {
    if (!navigator.geolocation || !geocoderRef.current) return
    setResolving(true)
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000 })
      )
      const { latitude, longitude } = pos.coords
      const { results } = await geocoderRef.current.geocode({ location: { lat: latitude, lng: longitude } })
      if (results?.[0]) {
        applyPlace(results[0].address_components, results[0].formatted_address, { lat: latitude, lng: longitude })
        setQuery(results[0].formatted_address)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setResolving(false)
    }
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  const fieldCls = 'w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors text-sm'
  const labelCls = 'block text-xs font-semibold mb-2 uppercase tracking-wide'

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Type chips */}
      <div>
        <label className={labelCls}>Address Type</label>
        <div className='flex gap-2'>
          {TYPES.map(({ id, label, Icon }) => (
            <button
              type='button'
              key={id}
              onClick={() => setForm((p) => ({ ...p, type: id }))}
              className={`flex items-center gap-2 px-4 py-2 border text-sm transition-colors ${
                form.type === id ? 'bg-locoxo-orange text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            >
              <Icon className='w-4 h-4' strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Location picker */}
      <div>
        <label className={labelCls}>Search Location</label>
        <div className='relative'>
          <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={isLoaded ? 'Start typing your address…' : 'Loading location service…'}
            disabled={!isLoaded}
            className={`${fieldCls} pl-10`}
          />
          {resolving && <Loader2 className='w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400' />}

          {predictions.length > 0 && (
            <div className='absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 max-h-64 overflow-y-auto shadow-lg'>
              {predictions.map((p) => (
                <button
                  type='button'
                  key={p.place_id}
                  onClick={() => selectPrediction(p)}
                  className='w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0'
                >
                  <p className='text-sm font-medium'>{p.structured_formatting?.main_text || p.description}</p>
                  <p className='text-xs text-gray-500 mt-0.5'>{p.structured_formatting?.secondary_text}</p>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type='button'
          onClick={useMyLocation}
          disabled={!isLoaded}
          className='mt-2 inline-flex items-center gap-1.5 text-xs text-black font-semibold hover:underline disabled:text-gray-400 disabled:no-underline'
        >
          <MapPin className='w-3.5 h-3.5' /> Use my current location
        </button>
      </div>

      {/* Recipient */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className={labelCls}>Recipient Name</label>
          <input name='name' value={form.name} onChange={onChange} required placeholder='Full name' className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Contact Number</label>
          <input name='phone' value={form.phone} onChange={onChange} required placeholder='+91 9876543210' className={fieldCls} />
        </div>
      </div>

      {/* Address details — autofilled, still editable */}
      <div>
        <label className={labelCls}>Street / Building</label>
        <input name='street' value={form.street} onChange={onChange} required placeholder='Flat, House no., Street' className={fieldCls} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className={labelCls}>Apartment / Floor (optional)</label>
          <input name='addressLine2' value={form.addressLine2} onChange={onChange} className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Landmark (optional)</label>
          <input name='landmark' value={form.landmark} onChange={onChange} className={fieldCls} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className={labelCls}>City</label>
          <input name='city' value={form.city} onChange={onChange} required className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>State</label>
          <input name='state' value={form.state} onChange={onChange} required className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Pincode</label>
          <input name='zipCode' value={form.zipCode} onChange={onChange} required className={fieldCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Country</label>
        <input name='country' value={form.country} onChange={onChange} required className={fieldCls} />
      </div>

      <label className='flex items-center gap-2 text-sm'>
        <input type='checkbox' name='isDefault' checked={form.isDefault} onChange={onChange} />
        <span>Set as default delivery address</span>
      </label>

      <div className='flex gap-3 pt-2'>
        <button type='submit' className='bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-locoxo-orange-dark transition-colors'>
          {submitLabel}
        </button>
        {onCancel && (
          <button type='button' onClick={onCancel} className='border border-gray-300 px-6 py-3 text-sm font-semibold hover:border-black transition-colors'>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default AddressForm
