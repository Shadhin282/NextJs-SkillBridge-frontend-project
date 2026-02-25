'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Skill Bridge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Skill Bridge connects students with expert tutors worldwide.
              We help learners achieve their goals through personalized
              online and offline learning experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>support@skillbridge.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-primary transition"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-primary transition"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-primary transition"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Skill Bridge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}