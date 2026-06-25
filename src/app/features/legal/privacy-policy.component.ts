import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './legal.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.setMeta({ title: 'Privacy Policy', description: 'Read the Privacy Policy of RentPhoenix Technologies Private Limited.' });
  }
}
