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

const GrievancePolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'GRIEVANCE REDRESSAL'} text2={'POLICY'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>Grievance Redressal Policy – Locoxo Apparels</p>
          <p><span className='font-semibold'>Effective Date:</span> 18 May 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          This Grievance Redressal Policy ("Policy") applies to all customers and users of www.locoxo.com, owned and operated by Locoxo Apparels. This Policy explains the process for submitting, tracking, and resolving grievances relating to products, orders, payments, deliveries, cancellations, returns, refunds, and related customer-support issues.
        </p>

        <Section number='1' title='Business Details'>
          <div className='bg-gray-50 border border-gray-200 p-5 space-y-1'>
            <p><span className='font-semibold'>Business Name:</span> Locoxo Apparels</p>
            <p><span className='font-semibold'>Website:</span> www.locoxo.com</p>
            <p><span className='font-semibold'>Registered Address:</span><br />
              Building No./Flat No. 2400/67, Friends Colony, Street No. 2,<br />
              Near Rohit Trading Company, Badi Haibowal,<br />
              Ludhiana, Punjab 141001, India
            </p>
            <p><span className='font-semibold'>Customer Support Email:</span> <a href='mailto:support@locoxo.com' className='underline hover:text-black'>support@locoxo.com</a></p>
            <p><span className='font-semibold'>Grievance Email:</span> <a href='mailto:support@locoxo.com' className='underline hover:text-black'>support@locoxo.com</a></p>
            <p><span className='font-semibold'>Phone / WhatsApp:</span> <a href='tel:+919876543210' className='underline hover:text-black'>+91 9876543210</a></p>
            <p><span className='font-semibold'>Business Hours:</span> 10:00 AM to 8:00 PM, Monday to Saturday</p>
          </div>
        </Section>

        <Section number='2' title='Purpose'>
          <p>
            This Policy is intended to provide a fair, transparent, and efficient grievance redressal mechanism for customers of Locoxo Apparels. It explains how complaints are received, acknowledged, and resolved, and aligns with standard e-commerce grievance-handling expectations.
          </p>
        </Section>

        <Section number='3' title='Scope of Grievances'>
          <p>This Policy covers complaints relating to:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Defective, damaged, or incorrect products</li>
            <li>Size, colour, design, or item mismatch</li>
            <li>Delay in shipping or delivery</li>
            <li>Missing items from an order</li>
            <li>Payment failure, duplicate deduction, or billing-related issues</li>
            <li>Refund, return, or exchange-related delays</li>
            <li>Cancellation-related disputes</li>
            <li>Poor, delayed, or unsatisfactory customer support</li>
          </ul>
        </Section>

        <Section number='4' title='How to Raise a Grievance'>
          <p>Customers may raise a grievance during business hours through the following channels:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Email: <a href='mailto:support@locoxo.com' className='underline hover:text-black'>support@locoxo.com</a></li>
            <li>Phone / WhatsApp: <a href='tel:+919876543210' className='underline hover:text-black'>+91 9876543210</a></li>
          </ul>
          <p className='mt-3'>When submitting a grievance, please include:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Your full name</li>
            <li>Order Number / Order ID</li>
            <li>Registered email address or phone number used at checkout</li>
            <li>A clear description of the issue</li>
            <li>Any relevant images, screenshots, or video proof, if applicable</li>
            <li>Preferred resolution (for example, refund, replacement, or exchange)</li>
          </ul>
        </Section>

        <Section number='5' title='Acknowledgement and Resolution Timeline'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
            <div className='bg-gray-50 border border-gray-200 p-4 text-center'>
              <p className='text-2xl font-bold text-black mb-1'>48 hrs</p>
              <p className='text-xs text-gray-500'>Acknowledgement of complaint</p>
            </div>
            <div className='bg-gray-50 border border-gray-200 p-4 text-center'>
              <p className='text-2xl font-bold text-black mb-1'>5–7 days</p>
              <p className='text-xs text-gray-500'>Resolution for routine cases</p>
            </div>
            <div className='bg-gray-50 border border-gray-200 p-4 text-center'>
              <p className='text-2xl font-bold text-black mb-1'>1 month</p>
              <p className='text-xs text-gray-500'>Complex cases requiring investigation</p>
            </div>
          </div>
          <p className='mt-3'>
            Where the matter requires detailed review, logistics verification, payment confirmation, or investigation, final redressal may take up to one month from the date of receipt of the complaint.
          </p>
        </Section>

        <Section number='6' title='Grievance Officer'>
          <p>
            Locoxo Apparels has appointed a designated Grievance Officer to handle customer complaints and ensure compliance with the grievance-handling requirements of the Consumer Protection (E-Commerce) Rules, 2020.
          </p>
          <div className='bg-gray-50 border border-gray-200 p-5 mt-3 space-y-1'>
            <p><span className='font-semibold'>Name:</span> Anamika Agarwal</p>
            <p><span className='font-semibold'>Designation:</span> Grievance Redressal Officer, Locoxo Apparels</p>
            <p><span className='font-semibold'>Phone / WhatsApp:</span> <a href='tel:+919876543210' className='underline hover:text-black'>+91 9876543210</a></p>
            <p><span className='font-semibold'>Email:</span> <a href='mailto:support@locoxo.com' className='underline hover:text-black'>support@locoxo.com</a></p>
            <p><span className='font-semibold'>Address:</span><br />
              Building No./Flat No. 2400/67, Friends Colony, Street No. 2,<br />
              Near Rohit Trading Company, Badi Haibowal,<br />
              Ludhiana, Punjab 141001, India
            </p>
          </div>
        </Section>

        <Section number='7' title='Return, Refund, and Cancellation Rules'>
          <div className='space-y-4'>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Return Window</h3>
              <p>Returns are accepted within 5 to 7 days after delivery, subject to eligibility and product condition.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Cancellation Window</h3>
              <p>Orders may be cancelled within 24 hours of placement, subject to dispatch status.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Non-returnable Items</h3>
              <p>Clearance sale products, customized products, and innerwear are generally not eligible for return or exchange unless the item delivered is defective, damaged, or materially different from the order.</p>
            </div>
          </div>
        </Section>

        <Section number='8' title='Refund Rule'>
          <ul className='list-disc list-inside space-y-2'>
            <li>Approved refunds will be initiated within 5 to 7 business days after the return or cancellation request is reviewed and approved.</li>
            <li>If the original payment method supports a direct refund, the amount may be credited back to the same payment method.</li>
            <li>If a direct refund is not possible, or if the customer requests transfer to another account, the customer must share their UPI ID or bank account details (including name, account number, IFSC, and UPI ID, if applicable).</li>
            <li>After the refund is approved, the amount will be transferred to the provided UPI ID or bank account within 5 to 7 business days.</li>
            <li>The customer is responsible for sharing correct payment details. Locoxo Apparels will not be liable for delays or failed transfers caused by incorrect or mistyped UPI IDs or bank details.</li>
          </ul>
        </Section>

        <Section number='9' title='Customer Responsibilities'>
          <p>To help ensure quick and fair grievance handling, customers should:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Provide complete and correct order details.</li>
            <li>Raise the complaint within the applicable return or support period.</li>
            <li>Share evidence where required for damaged, incorrect, or defective items.</li>
            <li>Cooperate with any verification, pickup, return, or payment confirmation process.</li>
          </ul>
        </Section>

        <Section number='10' title='Escalation and External Remedies'>
          <p>
            If a customer is not satisfied with the response provided by the support team, the matter may be escalated to the Grievance Officer using the details listed in Section 6. Customers may also pursue separate remedies through recognized consumer-protection channels, including the National Consumer Helpline, where applicable.
          </p>
        </Section>

        <Section number='11' title='Policy Updates'>
          <p>
            Locoxo Apparels reserves the right to amend or update this Policy from time to time. The latest version of this Policy will be published on www.locoxo.com and will become effective from the date of publication.
          </p>
        </Section>
      </div>
    </div>
  )
}

export default GrievancePolicy
