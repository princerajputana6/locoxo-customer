import React from 'react'
import Title from '../components/Title'

const Section = ({ number, title, children }) => (
  <div className='mb-8'>
    <h2 className='text-base font-bold tracking-wide mb-3 border-l-4 border-black pl-4'>
      {number}. {title}
    </h2>
    <div className='text-gray-600 leading-relaxed text-sm space-y-3 pl-4'>{children}</div>
  </div>
)

const ReturnPolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'RETURN, REFUND, EXCHANGE'} text2={'& DELIVERY'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>LOCOXO APPARELS</p>
          <p><span className='font-semibold'>Last Updated:</span> 19 July 2026</p>
        </div>

        <Section number='1' title='Business Information'>
          <p>Business Name: LOCOXO APPARELS</p>
          <p>Registered Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab, 141001, India</p>
          <p>Region of Operation: India only. No international shipping.</p>
          <p>Contact: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> | WhatsApp: +91 8824589682</p>
          <p>Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST (English &amp; Hindi)</p>
        </Section>

        <Section number='2' title='Delivery Policy'>
          <p>
            We aim to dispatch and deliver orders within the estimated timeline shown at checkout. Delivery timelines may
            vary depending on your location, courier availability, weather conditions, public holidays, or other unforeseen circumstances.
          </p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Orders are shipped only within India.</li>
            <li>Once your order has been dispatched, you will receive tracking details by email, WhatsApp, or SMS.</li>
            <li>Delivery timelines are counted from the date of dispatch or as shown on the website during checkout.</li>
            <li>Delays caused by courier partners or force majeure events are beyond our direct control.</li>
          </ul>
        </Section>

        <Section number='3' title='Return Window'>
          <p>
            Customers may request a return within 5 to 7 days from the date of delivery. The return period is counted from
            the date of delivery, not the order date.
          </p>
        </Section>

        <Section number='4' title='Refund Timeline'>
          <p>
            Once the returned product is received, inspected, and approved by our Quality Check team, the refund will be
            processed within 7 to 10 business days.
          </p>
        </Section>

        <Section number='5' title='Eligible Items for Return'>
          <p>The following items are eligible for return:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>All clothing products purchased from LOCOXO APPARELS</li>
            <li>Products with original tags attached</li>
            <li>Products that are unworn, unwashed, and unused</li>
            <li>Products returned in original packaging with invoice/order ID</li>
          </ul>
        </Section>

        <Section number='6' title='Non-Returnable Items'>
          <p>The following items are not eligible for return or exchange:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Innerwear and undergarments</li>
            <li>Customized or personalized products</li>
            <li>Sale, stock clearance, offer sale, and combo products</li>
            <li>Products purchased under non-returnable coupon offers, promotional offers, or BOGO offers</li>
            <li>Any item specifically marked as non-returnable or non-exchangeable</li>
          </ul>
        </Section>

        <Section number='7' title='Condition Requirements'>
          <p>For a return to be accepted, the product must:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Be unworn, unwashed, and unused</li>
            <li>Have original tags attached</li>
            <li>Include original packaging and invoice/order ID</li>
            <li>Be accompanied by product photos, packaging photos, or unboxing video if requested for verification</li>
          </ul>
          <p>Returns that do not meet these conditions may be rejected and sent back to the customer at the customer's cost.</p>
        </Section>

        <Section number='8' title='Refund Process'>
          <p>Step-by-step process:</p>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Log in to your account on our website.</li>
            <li>Open My Orders and select the eligible order.</li>
            <li>Click Request Return.</li>
            <li>Fill in the return form with your Order ID, reason for return, and refund account details, if applicable.</li>
            <li>Upload photos or video if requested.</li>
            <li>Once approved, our delivery partner will schedule pickup from your registered address.</li>
            <li>The product will be inspected by our Quality Check team.</li>
            <li>If approved, refund will be initiated within 7 to 10 business days to the original payment method.</li>
          </ol>
        </Section>

        <Section number='9' title='Refund Deductions'>
          <ul className='list-disc list-inside space-y-1'>
            <li>First-time orders: No return handling or processing charges deducted.</li>
            <li>Subsequent orders: Applicable delivery charges deducted from refund.</li>
            <li>COD orders: Delivery charges and COD handling charges deducted.</li>
            <li>Prepaid orders: Only delivery charges deducted.</li>
          </ul>
          <p>If a return is disputed, non-compliant, or requires investigation, LOCOXO reserves the right to delay, withhold, adjust, or reject the refund as permitted by applicable law.</p>
        </Section>

        <Section number='10' title='Return Shipping & Pickup'>
          <ul className='list-disc list-inside space-y-1'>
            <li>First-time orders: Free pickup and return shipping.</li>
            <li>Subsequent orders: Return shipping charges, including COD charges where applicable, will be deducted from the refund.</li>
          </ul>
          <p>We work with trusted logistics partners for pickup and delivery.</p>
        </Section>

        <Section number='11' title='Exchange Policy'>
          <p><span className='font-semibold'>Eligible exchanges:</span> Exchanges are available for size only.</p>
          <p><span className='font-semibold'>Exchange shipping charges:</span></p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Orders ₹999 and above: Free exchange shipping.</li>
            <li>Orders below ₹999: Customer pays exchange shipping through the website.</li>
            <li>First-time orders: Free exchange, regardless of order value.</li>
          </ul>
          <p><span className='font-semibold'>Exchange fulfilment time:</span> Exchanged products will be delivered within 7 to 10 days from pickup of the original item, subject to stock availability and logistics timelines.</p>
        </Section>

        <Section number='12' title='Out-of-Stock Replacement'>
          <p>
            If the requested replacement size is unavailable, we will keep the request open and provide the stock as soon as
            it becomes available. Our support team may also suggest another suitable solution, subject to availability.
          </p>
        </Section>

        <Section number='13' title='Damaged, Defective, or Wrong Items'>
          <p>
            Damaged, defective, or wrong items are eligible for return, replacement, or refund, even if worn, provided they
            are reported within 3 to 5 days of delivery and supported by clear photos or video evidence.
          </p>
          <p>For genuine manufacturing defects or damage in transit, we may offer repair, replacement, or refund, as per this policy.</p>
          <p>Any colour variation caused by lighting, camera, screen display, or editing is not considered a manufacturing defect or damage in transit.</p>
        </Section>

        <Section number='14' title='Product Image & Colour Disclaimer'>
          <p>
            We strive to display our products as accurately as possible. However, the actual product colour, shade, texture,
            print, or appearance may vary slightly from the images shown on the website due to photography lighting, image
            editing, screen resolution, display settings, and manufacturing variations.
          </p>
          <p>
            Product images are for illustrative purposes only, and accessories shown are included only if specifically mentioned.
            Minor variations are normal and shall not be considered a defect or valid reason for return, replacement, or refund
            unless the product received is damaged, defective, incorrect, or materially different from the description.
          </p>
        </Section>

        <Section number='15' title='Late or Lost Return Shipments'>
          <ul className='list-disc list-inside space-y-1'>
            <li>If a return shipment is lost in transit with valid tracking, we will investigate and process the refund once confirmed.</li>
            <li>Late returns beyond the return window may be rejected at our discretion.</li>
            <li>Customers are responsible for proper packaging and handover to the courier partner.</li>
          </ul>
        </Section>

        <Section number='16' title='How to Initiate a Return or Exchange'>
          <p><span className='font-semibold'>Through website:</span></p>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Go to My Orders.</li>
            <li>Select the order and click Request Return/Exchange.</li>
            <li>Fill in the required details and upload photos/video if requested.</li>
            <li>Wait for approval and pickup scheduling.</li>
          </ol>
          <p><span className='font-semibold'>Support-assisted request:</span></p>
          <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a><br />
            WhatsApp: +91 8824589682<br />
            Support Hours: Monday–Saturday, 10:00 AM – 8:00 PM IST</p>
        </Section>

        <Section number='17' title='Grievance Support'>
          <p>
            For escalations, contact our Grievance Officer at the same email with the subject line: <span className='font-semibold'>Grievance: [Order ID]</span>.
          </p>
        </Section>

        <Section number='18' title='Policy Updates'>
          <p>
            LOCOXO APPARELS reserves the right to update this policy at any time. Changes will be reflected on this page with
            an updated "Last Updated" date.
          </p>
        </Section>
      </div>
    </div>
  )
}

export default ReturnPolicy
