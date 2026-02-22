'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const ButtonModal = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    return (
        <div>
            <Button
                              
                                    size="lg"
                                    className="w-full text-lg h-12"
                                    onClick={() => setIsBookingModalOpen(true)}>
                                    Book a Session
                                </Button>
                                
                                
        </div>
    );
};

export default ButtonModal;