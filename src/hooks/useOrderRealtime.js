import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

let socket = null

const getSocket = () => {
    if (!socket) {
        const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
        socket = io(url, { transports: ['websocket', 'polling'] })
    }
    return socket
}

/**
 * Subscribes to live updates for one order. Call setOrderId(null) to unsubscribe.
 * Returns the latest payload pushed by the server (or null).
 */
export const useOrderRealtime = (orderId) => {
    const [update, setUpdate] = useState(null)
    const lastId = useRef(null)

    useEffect(() => {
        if (!orderId) return
        const s = getSocket()
        const handler = (payload) => {
            if (!payload?.orderId || payload.orderId === orderId) setUpdate(payload)
        }
        s.emit('subscribe:order', orderId)
        s.on('order:update', handler)
        lastId.current = orderId

        return () => {
            s.emit('unsubscribe:order', orderId)
            s.off('order:update', handler)
        }
    }, [orderId])

    return update
}

/** Subscribes to ALL of this user's order events. */
export const useUserOrderStream = (userId, onUpdate) => {
    useEffect(() => {
        if (!userId) return
        const s = getSocket()
        s.emit('subscribe:user', userId)
        s.on('order:update', onUpdate)
        return () => s.off('order:update', onUpdate)
    }, [userId, onUpdate])
}

export default useOrderRealtime
