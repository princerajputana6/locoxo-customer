import React from 'react'
import Title from '../components/Title'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-base font-bold tracking-wide mb-3 border-l-4 border-black pl-4'>{title}</h2>
    <div className='text-gray-600 leading-relaxed text-sm space-y-3 pl-4'>{children}</div>
  </div>
)

const CancellationPolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'CANCELLATION & ORDER'} text2={'MODIFICATION'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>LOCOXO APPARELS</p>
          <p><span className='font-semibold'>Last Updated:</span> 19 July 2026</p>
        </div>

        <Section title='Business Information'>
          <p>Business Name: LOCOXO APPARELS</p>
          <p>Registered Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab, 14001, India</p>
          <p>Region of Operation: India-only</p>
          <p>Contact: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> | Phone/WhatsApp: +91 8824589682</p>
          <p>Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST (English &amp; Hindi)</p>
        </Section>

        <Section title='Order Cancellation Policy'>
          <h3 className='font-semibold text-gray-800'>Before Shipping</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li><span className='font-semibold'>Can customers cancel before shipping?</span> No — once an order is placed, it cannot be cancelled directly.</li>
            <li><span className='font-semibold'>Time limit:</span> Orders can only be cancelled within 3 hours of placing the order via the website or WhatsApp.</li>
            <li><span className='font-semibold'>"Cancel Order" button:</span> Available on the website only for the first 3 hours after order placement. After 3 hours, the button is deactivated.</li>
            <li><span className='font-semibold'>OTP Confirmation:</span> If the customer does not confirm the OTP (One-Time Password) for order verification, the order will be automatically cancelled.</li>
            <li><span className='font-semibold'>OTP required for cancellation:</span> If any customer wants to cancel an order, they must confirm the cancellation using the OTP sent during order verification; cancellations will not be processed without OTP confirmation.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>After Shipping</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>If the order has already been shipped, customers cannot cancel.</li>
            <li>Customers must wait for delivery and then initiate a return as per our Return &amp; Refund Policy.</li>
            <li>Return shipping charges will apply as per the Return Policy (delivery charges deducted from refund for non-first-time orders).</li>
          </ul>
        </Section>

        <Section title='How to Cancel an Order'>
          <h3 className='font-semibold text-gray-800'>Through Website (Within 3 Hours)</h3>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Log in to your account</li>
            <li>Go to "My Orders"</li>
            <li>Click "Cancel Order" button (visible only within 3 hours of order placement)</li>
            <li>Enter Order ID</li>
            <li>Confirm cancellation (OTP confirmation required)</li>
          </ol>
          <h3 className='font-semibold text-gray-800'>Through WhatsApp (Within 3 Hours)</h3>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Send a message to +91 8824589682 with your Order ID</li>
            <li>Cancellation will be processed if within the 3-hour window and OTP confirmation is completed</li>
          </ol>
          <p className='italic'>Note: After 3 hours, the "Cancel Order" button is deactivated. You must wait for delivery and initiate a return instead.</p>
        </Section>

        <Section title='Cancellation Charges & Refunds'>
          <h3 className='font-semibold text-gray-800'>Cancellation Fees</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>Within 3 hours (before shipping): No cancellation fees</li>
            <li>After shipping (return process): Delivery charges will be deducted from refund as per Return Policy</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>Refund Timeline</h3>
          <p>5–7 business days after cancellation is confirmed and processed.</p>
          <h3 className='font-semibold text-gray-800'>Refund Method</h3>
          <p>Refund will be credited to the original payment method or as per refund details provided during the return/cancellation process.</p>
          <h3 className='font-semibold text-gray-800'>COD/Prepaid Orders – Special Rules</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li><span className='font-semibold'>Frequent cancellations:</span> If a customer cancels multiple orders repeatedly, LOCOXO reserves the right to suspend the account or restrict future orders.</li>
            <li>After repeated COD order cancellations by a customer, LOCOXO reserves the right to disable the Cash-on-Delivery (COD) payment option for that customer account.</li>
          </ul>
        </Section>

        <Section title='Order Modifications (Before Shipping)'>
          <p><span className='font-semibold'>What can be modified:</span> Size, Color, Shipping Address.</p>
          <p><span className='font-semibold'>How to Request Modification:</span> Through the website (My Orders → Modify Order).</p>
          <p><span className='font-semibold'>Cut-Off Time:</span> Modifications are allowed only within 3 hours of placing the order. After 3 hours, no modifications can be made — customers must wait for delivery and use the exchange process (for size only) as per Return Policy.</p>
        </Section>

        <Section title='Order Modifications (After Shipping)'>
          <h3 className='font-semibold text-gray-800'>Address Change After Dispatch</h3>
          <p>Not allowed — shipping address cannot be changed after the order is dispatched. Charges for address change: N/A (address changes not permitted after dispatch).</p>
          <h3 className='font-semibold text-gray-800'>Size/Color Exchange After Delivery</h3>
          <p>Size exchange only (no color exchange). Follow the Exchange Policy in our Return &amp; Refund Policy. Exchange shipping charges apply as per Return Policy (free for orders ₹999+, charged for orders below ₹999).</p>
        </Section>

        <Section title='Failed or Undelivered Orders'>
          <p>
            If delivery fails 2–3 times due to customer unavailability, incorrect address, or refusal to accept, the order
            will be automatically cancelled.
          </p>
        </Section>

        <Section title='Fraud & Abuse Prevention'>
          <h3 className='font-semibold text-gray-800'>Frequent Cancellations</h3>
          <p>If a customer frequently cancels orders, especially COD orders, LOCOXO reserves the right to:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Disable COD payment option after 3 COD cancellations</li>
            <li>Suspend or restrict the account to prevent abuse</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>Suspicious Orders</h3>
          <p>LOCOXO reserves the right to cancel any suspicious or fraudulent orders without notice. This includes orders with incorrect/fake addresses, unusual ordering patterns, or payment discrepancies.</p>
        </Section>

        <Section title='Contact & Support'>
          <div className='bg-gray-50 border border-gray-200 p-4'>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a></p>
            <p>Phone/WhatsApp: +91 8824589682 (Call &amp; WhatsApp)</p>
            <p>Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST</p>
            <p>Languages: English &amp; Hindi</p>
          </div>
          <p>For cancellations or modifications, contact us within the 3-hour window for fastest processing.</p>
        </Section>

        <Section title='Policy Updates'>
          <p>
            LOCOXO APPARELS reserves the right to update this policy at any time. Changes will be reflected on this page with
            an updated "Last Updated" date.
          </p>
        </Section>
      </div>
    </div>
  )
}

export default CancellationPolicy
