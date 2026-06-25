import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrl: './legal.component.scss'
})
export class TermsComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.setMeta({ title: 'Terms & Conditions', description: 'Read the Terms and Conditions of RentPhoenix Technologies Private Limited.' });
  }
}
