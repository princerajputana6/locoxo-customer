import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Gift, Copy, Users, Wallet, Share2 } from 'lucide-react'

const Referral = () => {
    const { backendUrl, token, navigate, currency } = useContext(ShopContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        const load = async () => {
            try {
                const res = await axios.get(backendUrl + '/api/referral/me', { headers: { token } })
                if (res.data.success) setData(res.data.referral)
            } catch (err) { console.error(err) } finally { setLoading(false) }
        }
        load()
    }, [token])

    const copy = (text) => { navigator.clipboard.writeText(text); toast.success('Copied!') }
    const share = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: 'LOCOXO', text: `Use my code ${data.code} to shop LOCOXO`, url: data.link }) } catch { /* cancelled */ }
        } else copy(data.link)
    }

    if (loading) return <div className='py-20 text-center text-gray-500'>Loading…</div>
    if (!data) return <div className='py-20 text-center text-gray-500'>Could not load referrals.</div>

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12'>
            <div className='text-center mb-10'>
                <div className='inline-flex items-center gap-2 bg-locoxo-orange/10 text-locoxo-orange-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4'>
                    <Gift size={16} /> REFER & EARN
                </div>
                <h1 className='text-4xl font-heading font-extrabold text-locoxo-header mb-3'>Give {currency}{data.rewardPerReferral}, Get {currency}{data.rewardPerReferral}</h1>
                <p className='text-gray-600 max-w-xl mx-auto'>Share your code. When a friend places their first order, you both earn wallet credit.</p>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10'>
                <Stat icon={Users} label='Friends Referred' value={data.referralCount} />
                <Stat icon={Wallet} label='Total Earned' value={`${currency}${data.referralEarnings}`} />
                <Stat icon={Wallet} label='Wallet Balance' value={`${currency}${data.walletBalance}`} accent />
            </div>

            {/* Code card */}
            <div className='max-w-2xl mx-auto bg-locoxo-header text-white rounded-2xl p-8 text-center mb-10'>
                <p className='text-sm uppercase tracking-widest text-white/60 mb-3'>Your referral code</p>
                <div className='inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-lg mb-5'>
                    <span className='text-2xl font-heading font-extrabold tracking-widest'>{data.code}</span>
                    <button onClick={() => copy(data.code)} className='text-locoxo-orange hover:text-white'><Copy size={20} /></button>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                    <button onClick={() => copy(data.link)} className='inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg text-sm font-semibold'>
                        <Copy size={16} /> Copy link
                    </button>
                    <button onClick={share} className='inline-flex items-center justify-center gap-2 bg-locoxo-orange hover:bg-locoxo-orange-dark px-5 py-2.5 rounded-lg text-sm font-semibold'>
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>

            {/* Referred users */}
            {data.referredUsers?.length > 0 && (
                <div className='max-w-2xl mx-auto'>
                    <h2 className='font-heading font-bold text-lg text-locoxo-header mb-4'>Your referrals</h2>
                    <div className='border border-gray-200 rounded-lg divide-y'>
                        {data.referredUsers.map((u) => (
                            <div key={u._id} className='flex items-center justify-between px-4 py-3'>
                                <div>
                                    <p className='font-medium text-locoxo-text'>{u.name}</p>
                                    <p className='text-xs text-gray-400'>{new Date(u.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.referralRewarded ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {u.referralRewarded ? 'Rewarded' : 'Pending first order'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const Stat = ({ icon: Icon, label, value, accent }) => (
    <div className={`rounded-xl p-5 border ${accent ? 'bg-locoxo-orange/10 border-locoxo-orange/40' : 'bg-white border-gray-200'}`}>
        <Icon className={`w-6 h-6 mb-2 ${accent ? 'text-locoxo-orange-dark' : 'text-locoxo-blue'}`} />
        <p className='text-2xl font-heading font-extrabold text-locoxo-header'>{value}</p>
        <p className='text-sm text-gray-500'>{label}</p>
    </div>
)

export default Referral
