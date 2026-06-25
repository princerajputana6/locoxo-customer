import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Check, Crown, Truck, Percent, Zap, Headphones } from 'lucide-react'

const perkIcon = (key) => ({ freeShipping: Truck, discountPercent: Percent, earlyAccess: Zap, prioritySupport: Headphones }[key] || Check)

const Membership = () => {
    const { backendUrl, token, navigate, currency } = useContext(ShopContext)
    const [plans, setPlans] = useState([])
    const [sub, setSub] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(true)

    const load = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/subscription/plans')
            if (data.success) setPlans(data.plans)
            if (token) {
                const me = await axios.get(backendUrl + '/api/subscription/me', { headers: { token } })
                if (me.data.success) { setSub(me.data.subscription); setIsActive(me.data.isActive) }
            }
        } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    useEffect(() => { load() }, [token])

    const subscribe = async (planId) => {
        if (!token) { navigate('/login'); return }
        try {
            const { data } = await axios.post(backendUrl + '/api/subscription/subscribe', { planId }, { headers: { token } })
            if (data.success) {
                if (!window.Cashfree) { toast.error('Cashfree SDK failed to load'); return }
                const cashfree = window.Cashfree({ mode: data.mode })
                cashfree.checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: '_self' })
            } else toast.error(data.message)
        } catch (err) { toast.error(err.message) }
    }

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12'>
            <div className='text-center mb-10'>
                <div className='inline-flex items-center gap-2 bg-locoxo-orange/10 text-locoxo-orange-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4'>
                    <Crown size={16} /> LOCOXO PREMIUM
                </div>
                <h1 className='text-4xl font-heading font-extrabold text-locoxo-header mb-3'>Wear More. Pay Less.</h1>
                <p className='text-gray-600 max-w-xl mx-auto'>Unlock free shipping, members-only discounts and early access to every drop.</p>
            </div>

            {isActive && (
                <div className='max-w-2xl mx-auto mb-10 p-5 bg-locoxo-header text-white rounded-xl flex items-center justify-between'>
                    <div>
                        <p className='font-heading font-bold text-lg'>You're a Premium member 👑</p>
                        <p className='text-sm text-white/70'>Valid till {sub?.endDate ? new Date(sub.endDate).toLocaleDateString() : '—'}</p>
                    </div>
                    <Crown className='w-10 h-10 text-locoxo-orange' />
                </div>
            )}

            {loading ? (
                <p className='text-center text-gray-500'>Loading plans…</p>
            ) : plans.length === 0 ? (
                <p className='text-center text-gray-500'>No membership plans available yet.</p>
            ) : (
                <div className='grid gap-6 md:grid-cols-3 max-w-5xl mx-auto'>
                    {plans.map((plan) => (
                        <div key={plan._id} className='border-2 border-gray-200 rounded-xl p-6 flex flex-col hover:border-locoxo-orange transition-colors bg-white'>
                            {plan.badge && <span className='self-start bg-locoxo-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3'>{plan.badge}</span>}
                            <h3 className='font-heading font-bold text-xl text-locoxo-header'>{plan.name}</h3>
                            <p className='text-sm text-gray-500 mb-4'>{plan.description}</p>
                            <div className='mb-4'>
                                <span className='text-3xl font-heading font-extrabold text-locoxo-blue'>{currency}{plan.price}</span>
                                <span className='text-sm text-gray-500'> / {plan.durationDays} days</span>
                            </div>
                            <ul className='space-y-2 mb-6 flex-1'>
                                {plan.perks?.freeShipping && <Perk icon={perkIcon('freeShipping')} text='Free shipping on all orders' />}
                                {plan.perks?.discountPercent > 0 && <Perk icon={perkIcon('discountPercent')} text={`${plan.perks.discountPercent}% extra discount`} />}
                                {plan.perks?.earlyAccess && <Perk icon={perkIcon('earlyAccess')} text='Early access to drops' />}
                                {plan.perks?.prioritySupport && <Perk icon={perkIcon('prioritySupport')} text='Priority support' />}
                                {(plan.benefits || []).map((b, i) => <Perk key={i} icon={Check} text={b} />)}
                            </ul>
                            <button onClick={() => subscribe(plan._id)} disabled={isActive}
                                className='w-full bg-locoxo-orange hover:bg-locoxo-orange-dark text-white py-3 font-semibold tracking-wide transition-colors disabled:bg-gray-300'>
                                {isActive ? 'ALREADY A MEMBER' : 'GET PREMIUM'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Perk = ({ icon: Icon, text }) => (
    <li className='flex items-center gap-2 text-sm text-locoxo-text'>
        <span className='w-6 h-6 rounded-full bg-locoxo-bg flex items-center justify-center'><Icon size={14} className='text-locoxo-blue' /></span>
        {text}
    </li>
)

export default Membership
