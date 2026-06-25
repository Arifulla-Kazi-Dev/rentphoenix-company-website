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
        { label: 'About', path: '/about' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Careers', path: '/careers' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Services', path: '/services' },
        { label: 'Government Solutions', path: '/government-solutions' },
        { label: 'Products', path: '/products' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms & Conditions', path: '/terms' },
        { label: 'Contact', path: '/contact' },
      ]
    }
  ];
}
