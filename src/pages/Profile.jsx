import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  User, Package, MapPin, HelpCircle, LogOut,
  Plus, Trash2, Home, Briefcase, Send, X, ArrowRight, RotateCcw
} from 'lucide-react'
import AddressForm from '../components/AddressForm'

const typeIcon = (t) => (t === 'work' ? Briefcase : t === 'other' ? MapPin : Home)

const Profile = () => {
  const { token, backendUrl, navigate, setToken } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', addresses: [] })
  const [loading, setLoading] = useState(true)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' })

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchUserData()
    const hash = window.location.hash.replace('#', '')
    if (hash && ['overview','orders','returns','addresses','profile','support'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [token])

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
      if (data.success) {
        setUserData(data.user)
        setProfileForm({ name: data.user.name || '', phone: data.user.phone || '' })
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSave = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(backendUrl + '/api/user/profile', profileForm, { headers: { token } })
      if (data.success) {
        toast.success('Profile updated')
        setEditingProfile(false)
        fetchUserData()
      } else toast.error(data.message)
    } catch {
      toast.error('Failed to update')
    }
  }

  const handleAddAddress = async (address) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/address', address, { headers: { token } })
      if (data.success) {
        toast.success('Address saved')
        setShowAddressForm(false)
        fetchUserData()
      } else toast.error(data.message)
    } catch {
      toast.error('Failed to save address')
    }
  }

  const handleDeleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(backendUrl + '/api/user/address/' + id, { headers: { token } })
      if (data.success) {
        toast.success('Address deleted')
        fetchUserData()
      }
    } catch {
      toast.error('Failed to delete address')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
  }

  const menuItems = [
    { id: 'overview',  label: 'Overview',       Icon: User },
    { id: 'orders',    label: 'My Orders',      Icon: Package },
    { id: 'returns',   label: 'My Returns',     Icon: RotateCcw },
    { id: 'addresses', label: 'My Addresses',   Icon: MapPin },
    { id: 'profile',   label: 'My Profile',     Icon: User },
    { id: 'support',   label: 'Help & Support', Icon: HelpCircle },
  ]

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Loading profile…</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar */}
          <aside className='lg:col-span-1'>
            <div className='bg-white border border-gray-200 overflow-hidden'>
              {menuItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-left border-l-2 transition-colors ${
                    activeTab === id
                      ? 'bg-gray-50 border-black text-black'
                      : 'border-transparent text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className='w-5 h-5' strokeWidth={1.5} />
                  {label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-left border-l-2 border-transparent text-red-600 hover:bg-red-50'
              >
                <LogOut className='w-5 h-5' strokeWidth={1.5} />
                Logout
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className='lg:col-span-3'>
            {activeTab === 'overview' && (
              <OverviewPanel userData={userData} setActiveTab={setActiveTab} navigate={navigate} />
            )}
            {activeTab === 'orders' && (
              <Panel title='My Orders'>
                <p className='text-gray-500 mb-4'>Visit the Orders page to see all your orders.</p>
                <button onClick={() => navigate('/orders')} className='bg-locoxo-orange text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>
                  View All Orders
                </button>
              </Panel>
            )}
            {activeTab === 'addresses' && (
              <Panel
                title='My Addresses'
                action={
                  !showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className='inline-flex items-center gap-2 bg-locoxo-orange text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'
                    >
                      <Plus className='w-4 h-4' /> Add New
                    </button>
                  )
                }
              >
                {showAddressForm ? (
                  <AddressForm
                    initial={{ name: userData.name, phone: userData.phone }}
                    onSubmit={handleAddAddress}
                    onCancel={() => setShowAddressForm(false)}
                    submitLabel='Save Address'
                  />
                ) : userData.addresses?.length === 0 ? (
                  <EmptyState Icon={MapPin} title='No addresses yet' desc='Add an address to speed up checkout.' />
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {userData.addresses.map((a) => {
                      const Icon = typeIcon(a.type)
                      return (
                        <div key={a._id} className='border border-gray-200 p-5'>
                          <div className='flex justify-between items-start mb-3'>
                            <div className='flex items-center gap-2'>
                              <Icon className='w-4 h-4' strokeWidth={1.5} />
                              <span className='text-xs font-semibold uppercase tracking-widest'>{a.type || 'home'}</span>
                              {a.isDefault && (
                                <span className='bg-locoxo-orange text-white text-[10px] uppercase tracking-widest px-2 py-0.5'>Default</span>
                              )}
                            </div>
                            <button onClick={() => handleDeleteAddress(a._id)} className='text-gray-400 hover:text-red-600'>
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                          <p className='text-sm font-semibold'>{a.name}</p>
                          <p className='text-xs text-gray-500 mb-2'>{a.phone}</p>
                          <p className='text-sm text-gray-700'>{a.street}</p>
                          {a.addressLine2 && <p className='text-sm text-gray-700'>{a.addressLine2}</p>}
                          {a.landmark && <p className='text-xs text-gray-500'>Near {a.landmark}</p>}
                          <p className='text-sm text-gray-700'>{a.city}, {a.state} {a.zipCode}</p>
                          <p className='text-sm text-gray-700'>{a.country}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Panel>
            )}
            {activeTab === 'profile' && (
              <Panel title='My Profile'>
                <form onSubmit={handleProfileSave} className='space-y-5 max-w-xl'>
                  <Field label='Full Name'>
                    <input
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm'
                    />
                  </Field>
                  <Field label='Email'>
                    <input
                      value={userData.email}
                      disabled
                      className='w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 text-sm'
                    />
                  </Field>
                  <Field label='Phone'>
                    <input
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm'
                    />
                  </Field>
                  <button className='bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>
                    Save Changes
                  </button>
                </form>
              </Panel>
            )}
            {activeTab === 'returns' && <ReturnsPanel backendUrl={backendUrl} token={token} userId={userData._id} />}
            {activeTab === 'support' && <SupportPanel backendUrl={backendUrl} token={token} />}
          </main>
        </div>
      </div>
    </div>
  )
}

const Panel = ({ title, action, children }) => (
  <div className='bg-white border border-gray-200 p-6 sm:p-8'>
    <div className='flex flex-wrap gap-4 items-center justify-between mb-6'>
      <h2 className='text-xl font-bold tracking-tight uppercase'>{title}</h2>
      {action}
    </div>
    {children}
  </div>
)

const Field = ({ label, children }) => (
  <div>
    <label className='block text-xs font-semibold mb-2 uppercase tracking-wide'>{label}</label>
    {children}
  </div>
)

const EmptyState = ({ Icon, title, desc }) => (
  <div className='text-center py-12 border border-dashed border-gray-200'>
    <Icon className='w-10 h-10 mx-auto mb-3 text-gray-300' strokeWidth={1.5} />
    <p className='font-semibold text-sm'>{title}</p>
    <p className='text-xs text-gray-500 mt-1'>{desc}</p>
  </div>
)

const RETURN_STATUS = {
  pending:   'bg-amber-100 text-amber-700',
  approved:  'bg-blue-100 text-blue-700',
  rejected:  'bg-red-100 text-red-700',
  completed: 'bg-green-100 text-green-700',
}

const ReturnsPanel = ({ backendUrl, token, userId }) => {
  const [returns, setReturns] = useState([])
  const [orders, setOrders] = useState([])
  const [view, setView] = useState('list')
  const [form, setForm] = useState({ orderId: '', productId: '', reason: '', description: '' })
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const [retRes, ordRes] = await Promise.all([
        userId ? axios.get(backendUrl + '/api/return/user/' + userId, { headers: { token } }) : { data: { returns: [] } },
        axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      ])
      if (retRes.data?.success !== false) setReturns(retRes.data.returns || [])
      if (ordRes.data?.success) setOrders(ordRes.data.orders.filter(o => o.status === 'Delivered'))
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  const selectedOrder = orders.find(o => o._id === form.orderId)
  const reasons = ['Wrong size', 'Wrong item received', 'Damaged / defective', 'Not as described', 'Quality issue', 'Other']

  const submit = async (e) => {
    e.preventDefault()
    if (!form.orderId || !form.productId || !form.reason) {
      toast.error('Pick order, item and reason')
      return
    }
    try {
      const { data } = await axios.post(backendUrl + '/api/return/create', form, { headers: { token } })
      if (data.success) {
        toast.success('Return requested')
        setForm({ orderId: '', productId: '', reason: '', description: '' })
        setView('list')
        load()
      } else toast.error(data.message)
    } catch { toast.error('Failed to create return') }
  }

  if (loading) return <Panel title='My Returns'><p className='text-gray-500'>Loading…</p></Panel>

  if (view === 'new') {
    return (
      <Panel
        title='Request Return'
        action={
          <button onClick={() => setView('list')} className='text-sm font-semibold hover:underline inline-flex items-center gap-1'>
            <X className='w-4 h-4' /> Cancel
          </button>
        }
      >
        {orders.length === 0 ? (
          <EmptyState Icon={RotateCcw} title='No eligible orders' desc='Only delivered orders can be returned.' />
        ) : (
          <form onSubmit={submit} className='space-y-5 max-w-2xl'>
            <Field label='Select Order'>
              <select
                required
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value, productId: '' })}
                className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm bg-white'
              >
                <option value=''>Choose a delivered order…</option>
                {orders.map(o => (
                  <option key={o._id} value={o._id}>
                    {o.orderNumber} — {new Date(o.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </Field>

            {selectedOrder && (
              <Field label='Select Item'>
                <div className='space-y-2'>
                  {selectedOrder.items.map((it, i) => (
                    <label key={i} className={`flex items-center gap-3 border p-3 cursor-pointer ${form.productId === it.productId ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                      <input
                        type='radio'
                        name='item'
                        checked={form.productId === it.productId}
                        onChange={() => setForm({ ...form, productId: it.productId })}
                      />
                      <img src={it.image} alt='' className='w-12 h-12 object-cover' />
                      <div className='flex-1 text-sm'>
                        <p className='font-medium'>{it.name}</p>
                        <p className='text-xs text-gray-500'>Size {it.size} · Qty {it.quantity}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Field>
            )}

            <Field label='Reason'>
              <select
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm bg-white'
              >
                <option value=''>Choose a reason…</option>
                {reasons.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>

            <Field label='Additional Details (optional)'>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder='Describe the issue…'
                className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm resize-none'
              />
            </Field>

            <button className='bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark inline-flex items-center gap-2'>
              <Send className='w-4 h-4' /> Submit Return Request
            </button>
          </form>
        )}
      </Panel>
    )
  }

  return (
    <Panel
      title='My Returns'
      action={
        <button onClick={() => setView('new')} className='inline-flex items-center gap-2 bg-locoxo-orange text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>
          <Plus className='w-4 h-4' /> Request Return
        </button>
      }
    >
      {returns.length === 0 ? (
        <EmptyState Icon={RotateCcw} title='No returns yet' desc='Delivered items can be returned within 7 days.' />
      ) : (
        <div className='divide-y divide-gray-200 border border-gray-200'>
          {returns.map((r) => (
            <div key={r._id} className='px-5 py-4 flex items-start gap-4'>
              {r.productId?.image && (
                <img src={Array.isArray(r.productId.image) ? r.productId.image[0] : r.productId.image} alt='' className='w-14 h-14 object-cover bg-gray-100' />
              )}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className={`text-[10px] px-2 py-0.5 uppercase tracking-widest font-semibold ${RETURN_STATUS[r.status]}`}>{r.status}</span>
                  {r.orderId?.orderNumber && <span className='text-xs text-gray-500'>{r.orderId.orderNumber}</span>}
                </div>
                <p className='font-semibold text-sm'>{r.productId?.name || 'Item'}</p>
                <p className='text-xs text-gray-500 mt-0.5'>Reason: {r.reason}</p>
                {r.adminNotes && <p className='text-xs text-gray-700 mt-1'><strong>Support:</strong> {r.adminNotes}</p>}
                <p className='text-[11px] text-gray-400 mt-1'>Requested {new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              {r.refundAmount > 0 && r.status === 'completed' && (
                <div className='text-right'>
                  <p className='text-[10px] uppercase tracking-widest text-gray-500'>Refund</p>
                  <p className='font-semibold'>₹{r.refundAmount}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Panel>
  )
}

const OverviewPanel = ({ userData, setActiveTab, navigate }) => (
  <div className='space-y-6'>
    <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center'>
      <div className='w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4'>
        {userData.name?.charAt(0)?.toUpperCase() || 'U'}
      </div>
      <h2 className='text-2xl font-bold mb-1'>{userData.name || 'User'}</h2>
      <p className='text-sm mb-1'>{userData.email}</p>
      {userData.phone && <p className='text-xs'>{userData.phone}</p>}
      <button
        onClick={() => setActiveTab('profile')}
        className='mt-6 bg-locoxo-orange text-white px-8 py-3 font-semibold tracking-wide uppercase hover:bg-locoxo-orange-dark transition-colors w-full max-w-md'
      >
        Edit Profile
      </button>
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {[
        { Icon: Package,    label: 'My Orders',      desc: 'View, modify and track orders', onClick: () => setActiveTab('orders') },
        { Icon: MapPin,     label: 'My Addresses',   desc: 'Edit, add or remove addresses', onClick: () => setActiveTab('addresses') },
        { Icon: User,       label: 'My Profile',     desc: 'Edit personal info',            onClick: () => setActiveTab('profile') },
        { Icon: HelpCircle, label: 'Help & Support', desc: 'Raise a ticket with our team',  onClick: () => setActiveTab('support') },
      ].map(({ Icon, label, desc, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className='bg-white border border-gray-200 p-6 text-left hover:border-black transition-colors'
        >
          <Icon className='w-6 h-6 mb-3' strokeWidth={1.5} />
          <h3 className='font-semibold mb-1'>{label}</h3>
          <p className='text-xs text-gray-500'>{desc}</p>
        </button>
      ))}
    </div>
  </div>
)

const STATUS_COLORS = {
  open:     'bg-blue-100 text-blue-700',
  pending:  'bg-amber-100 text-amber-700',
  resolved: 'bg-green-100 text-green-700',
  closed:   'bg-gray-200 text-gray-600',
}

const SupportPanel = ({ backendUrl, token }) => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // list | new | thread
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'other', message: '' })

  const load = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/ticket/mine', { headers: { token } })
      if (data.success) setTickets(data.tickets)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const openThread = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + '/api/ticket/mine/' + id, { headers: { token } })
      if (data.success) {
        setSelected(data.ticket)
        setView('thread')
      }
    } catch (err) { console.error(err) }
  }

  const submitNew = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/ticket', newTicket, { headers: { token } })
      if (data.success) {
        toast.success('Ticket raised')
        setNewTicket({ subject: '', category: 'other', message: '' })
        setSelected(data.ticket)
        setView('thread')
        load()
      } else toast.error(data.message)
    } catch { toast.error('Failed to raise ticket') }
  }

  const submitReply = async (e) => {
    e.preventDefault()
    if (!reply.trim()) return
    try {
      const { data } = await axios.post(
        backendUrl + '/api/ticket/mine/' + selected._id + '/reply',
        { message: reply },
        { headers: { token } }
      )
      if (data.success) {
        setSelected(data.ticket)
        setReply('')
        load()
      } else toast.error(data.message)
    } catch { toast.error('Failed to send reply') }
  }

  useEffect(() => { load() }, [])

  if (loading) return <Panel title='Help & Support'><p className='text-gray-500'>Loading…</p></Panel>

  if (view === 'new') {
    return (
      <Panel
        title='Raise a Ticket'
        action={
          <button onClick={() => setView('list')} className='text-sm font-semibold hover:underline inline-flex items-center gap-1'>
            <X className='w-4 h-4' /> Cancel
          </button>
        }
      >
        <form onSubmit={submitNew} className='space-y-5 max-w-2xl'>
          <Field label='Subject'>
            <input
              required
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              placeholder='Briefly describe your issue'
              className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm'
            />
          </Field>
          <Field label='Category'>
            <select
              value={newTicket.category}
              onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm bg-white'
            >
              <option value='order'>Order</option>
              <option value='payment'>Payment</option>
              <option value='product'>Product</option>
              <option value='account'>Account</option>
              <option value='other'>Other</option>
            </select>
          </Field>
          <Field label='Message'>
            <textarea
              required
              rows={6}
              value={newTicket.message}
              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              placeholder='Describe your issue in detail. Include order numbers if relevant.'
              className='w-full px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm resize-none'
            />
          </Field>
          <button className='bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark inline-flex items-center gap-2'>
            <Send className='w-4 h-4' /> Submit Ticket
          </button>
        </form>
      </Panel>
    )
  }

  if (view === 'thread' && selected) {
    return (
      <Panel
        title={selected.subject}
        action={
          <button onClick={() => { setView('list'); load() }} className='text-sm font-semibold hover:underline inline-flex items-center gap-1'>
            <ArrowRight className='w-4 h-4 rotate-180' /> Back
          </button>
        }
      >
        <div className='flex flex-wrap items-center gap-2 mb-6 text-xs'>
          <span className={`px-2 py-1 uppercase tracking-widest font-semibold ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
          <span className='text-gray-500'>· {selected.category}</span>
          <span className='text-gray-500'>· Created {new Date(selected.createdAt).toLocaleDateString()}</span>
        </div>

        <div className='space-y-4 mb-6 max-h-[480px] overflow-y-auto pr-2'>
          {selected.messages.map((m) => (
            <div key={m._id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 border ${m.sender === 'user' ? 'bg-locoxo-orange text-white border-black' : 'bg-gray-50 border-gray-200'}`}>
                <p className='text-[10px] uppercase tracking-widest opacity-70 mb-1'>{m.sender === 'admin' ? 'Support' : 'You'}</p>
                <p className='text-sm whitespace-pre-wrap'>{m.body}</p>
                <p className='text-[10px] mt-2 opacity-60'>{new Date(m.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {selected.status !== 'closed' && (
          <form onSubmit={submitReply} className='flex flex-col sm:flex-row gap-3'>
            <textarea
              rows={2}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder='Type your reply…'
              className='flex-1 px-4 py-3 border border-gray-300 focus:border-black outline-none text-sm resize-none'
            />
            <button className='bg-locoxo-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark inline-flex items-center gap-2 self-start'>
              <Send className='w-4 h-4' /> Send
            </button>
          </form>
        )}
      </Panel>
    )
  }

  return (
    <Panel
      title='Help & Support'
      action={
        <button onClick={() => setView('new')} className='inline-flex items-center gap-2 bg-locoxo-orange text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-locoxo-orange-dark'>
          <Plus className='w-4 h-4' /> New Ticket
        </button>
      }
    >
      {tickets.length === 0 ? (
        <EmptyState Icon={HelpCircle} title='No tickets yet' desc='Raise a ticket and our team will get back to you.' />
      ) : (
        <div className='divide-y divide-gray-200 border border-gray-200'>
          {tickets.map((t) => (
            <button
              key={t._id}
              onClick={() => openThread(t._id)}
              className='w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4'
            >
              <div className='min-w-0'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className={`text-[10px] px-2 py-0.5 uppercase tracking-widest font-semibold ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                  <span className='text-xs text-gray-500'>{t.category}</span>
                </div>
                <p className='font-semibold text-sm truncate'>{t.subject}</p>
                <p className='text-xs text-gray-500 mt-0.5'>
                  {t.messages.length} message{t.messages.length === 1 ? '' : 's'} · Updated {new Date(t.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <ArrowRight className='w-4 h-4 text-gray-400 flex-shrink-0' />
            </button>
          ))}
        </div>
      )}
    </Panel>
  )
}

export default Profile
