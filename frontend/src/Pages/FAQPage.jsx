import Panel from '../components/Panel.jsx'
import React, { useState } from 'react'

function FAQPage() {
    const [activeIndex, setActiveIndex] = useState(null); // Allow null for no active panel

    return (
        <div className='mt-[100px]'>
            <div className='pt-20 flex items-center flex-col gap-4'>
                <div>
                    <h1 className='intro-title text-8xl'>Your Right to Know</h1>
                </div>

                <div className='FAQ-container  p-4 my-10 px-10 h-[50%] w-[50%]'>
                    
                    <Panel
                        title="What is the refund policy?"
                        isActive={activeIndex === 0}
                        onShow={() => setActiveIndex(activeIndex === 0 ? null : 0)} // Toggle on click
                    >
                       We offer a full refund on tickets within 2 Hours of purchase
                       To request a refund, please contact our support team with your ticket details, and we will process your refund.
                       Refund requests made after the 2 hours window will not be eligible

                    </Panel>

                    <Panel
                        title="How do I earn discount points?"
                        isActive={activeIndex === 1}
                        onShow={() => setActiveIndex(activeIndex === 1 ? null : 1)} // Toggle on click
                    >
                         When you purchase a museum membership from our website, you automatically earn discount points.
                    </Panel>

                    <Panel
                        title="Will I get Discounts Points On Every Tickets I Buy ?"
                        isActive={activeIndex === 2}
                        onShow={() => setActiveIndex(activeIndex === 2 ? null : 2)} // Toggle on click
                    >
                        Yes, But Only After Purchasing Membership.You will get the points on every Ticket you buy.
                    </Panel>

                    <Panel
                        title="Where can I use my discount points?"
                        isActive={activeIndex === 3}
                        onShow={() => setActiveIndex(activeIndex === 3 ? null : 3)} // Toggle on click
                    >
                        You can redeem your discount points at participating restaurants and shops near the museum. A full list of participating businesses is available on our website under the Nearby Restaurants and Shops Section
                    </Panel>
                
                    <Panel
                        title="How do I redeem my discount points at restaurants or shops?"
                        isActive={activeIndex === 4}
                        onShow={() => setActiveIndex(activeIndex === 4 ? null : 4)} // Toggle on click
                    >
                        To redeem your points, simply present your membership ID at the participating business. The points will be applied as a discount at checkout
                    </Panel>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;

