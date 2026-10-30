import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Linkedin, Mail, ArrowUpRight } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly LinkedinIcon = Linkedin;
  readonly MailIcon = Mail;
  readonly ArrowIcon = ArrowUpRight;

  readonly nav = [
    {
      title: 'Company',
      links: [
        { label: 'Our story', path: '/about' },
        { label: 'Team', path: '/team' },
        { label: 'Careers', path: '/careers' },
        { label: 'Contact', path: '/contact' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'RentPhoenix OS', path: '/products' },
        { label: 'CO-Founder', path: '/products/co-founder' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Services', path: '/services' },
        { label: 'Government', path: '/government-solutions' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms & Conditions', path: '/terms' },
      ]
    }
  ];
}
