'use client'
import React, { useState } from 'react';
import { TutorProfile } from '../../../../types';
import { BookingModal } from './BookingModal';


const BookingModals = ({tutor}:{tutor : TutorProfile}) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    return (
        <div>
            <BookingModal
                tutor={tutor}
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onBook={(details) => console.log('Booked:', details)} />
        </div>
    );
};

export default BookingModals;