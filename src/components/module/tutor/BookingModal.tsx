'use client'

import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TutorProfile } from '../../../../types';
import Image from 'next/image';



interface BookingModalProps {
    tutor: TutorProfile;
    isOpen: boolean;
    onClose: () => void;
    onBook: (details : {
        tutorId: string;
            subject: string;
            date: string;
            time: string;
    }) => void;
}

export function BookingModal({
    tutor,
    isOpen,
    onClose,
    onBook
}: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(tutor.subjects[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleBook = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onBook({
            tutorId: tutor.id ,
            subject: selectedSubject,
            date: selectedDate,
            time: selectedTime
        });
        setStep(3); // Success step
        setIsSubmitting(false);
    };

    // Generate next 7 days for demo
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            value: d.toISOString().split('T')[0],
            label: d.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            })
        };
    });

    const times = [
        '09:00', '10:00', '11:00', '13:00',
        '14:00', '15:00', '16:00', '17:00'
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-lg">
                        {step === 3 ? 'Booking Confirmed' : 'Book a Session'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center p-3 bg-primary/5 rounded-lg mb-4">
                                <div className="w-10 h-10 rounded-full mr-3 bg-gray-200 overflow-hidden">
                                    <Image src={tutor.user.image} alt={tutor.user.name} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="font-medium">{tutor.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        ${tutor.hourlyRate}/hour
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Select Subject</Label>
                                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tutor.subjects.map((s:string) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Select Date</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {dates.slice(0, 4).map((date) => (
                                        <button
                                            key={date.value}
                                            onClick={() => setSelectedDate(date.value)}
                                            className={`p-2 text-sm border rounded-md transition-colors ${selectedDate === date.value ? 'border-primary bg-primary/5 text-primary' : 'hover:border-gray-300'}`}>
                                            {date.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Select Time</Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {times.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`p-2 text-sm border rounded-md text-center transition-colors ${selectedTime === time ? 'border-primary bg-primary/5 text-primary' : 'hover:border-gray-300'}`}>
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button
                                className="w-full mt-4"
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(2)}>
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tutor</span>
                                    <span className="font-medium">{tutor.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subject</span>
                                    <span className="font-medium">{selectedSubject}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Date & Time</span>
                                    <span className="font-medium">
                                        {selectedDate} at {selectedTime}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-medium">60 minutes</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${tutor.hourlyRate}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button className="flex-1" onClick={handleBook} disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Booking Confirmed!</h4>
                            <p className="text-gray-600 mb-6">
                                Your session with {tutor.name} has been scheduled. You will
                                receive a confirmation email shortly.
                            </p>
                            <Button className="w-full" onClick={onClose}>
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
