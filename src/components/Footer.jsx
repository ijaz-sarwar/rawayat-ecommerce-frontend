import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { navigate, setSelectedCategory } = useApp();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Curated Stores Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Curated Stores</h4>
          <ul className="footer-links-list">
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('Interior Lighting & Lamps');
                  navigate('category');
                }}
                className="footer-link-btn"
              >
                Multan Crafts Hub (Blue Pottery)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('Apparel & Linen');
                  navigate('category');
                }}
                className="footer-link-btn"
              >
                Rung De Dupatta (Lahore)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('Shawls & Dupattas');
                  navigate('category');
                }}
                className="footer-link-btn"
              >
                Kashur Threads (Kashmir)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('Fine Jewellery');
                  navigate('category');
                }}
                className="footer-link-btn"
              >
                Noor Jewels Lahore (Anarkali)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('Hand-Knitted Crochet Handbag');
                  navigate('category');
                }}
                className="footer-link-btn"
              >
                Sindhi Artisans (Bhit Shah)
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Customer Care</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => navigate('order-tracking')} className="footer-link-btn">
                Track My Order
              </button>
            </li>
            <li>
              <button onClick={() => navigate('my-account')} className="footer-link-btn">
                My Account & Offers
              </button>
            </li>
            <li>
              <span className="footer-link-text">Return Policy (7 Days)</span>
            </li>
            <li>
              <span className="footer-link-text">Secure Payment (JazzCash / Easypaisa / COD)</span>
            </li>
            <li>
              <button onClick={() => navigate('make-offer')} className="footer-link-btn">
                Negotiation & Offer Guide
              </button>
            </li>
            <li>
              <span className="footer-link-text">Dispute Resolution</span>
            </li>
          </ul>
        </div>

        {/* Seller Corner Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Seller Corner</h4>
          <ul className="footer-links-list">
            <li>
              <button
                onClick={() => navigate('register-store')}
                className="footer-link-btn highlight-seller"
              >
                Register Your Store
              </button>
            </li>
            <li>
              <button onClick={() => navigate('seller-dashboard')} className="footer-link-btn">
                Seller Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => navigate('offer-response')} className="footer-link-btn">
                Offer Response Portal
              </button>
            </li>
            <li>
              <button onClick={() => navigate('seller-terms')} className="footer-link-btn">
                Pricing & Commission Rates
              </button>
            </li>
            <li>
              <button onClick={() => navigate('seller-terms')} className="footer-link-btn">
                Seller Protection Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Heritage Story & Socials Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Rawayat & Co</h4>
          <p className="footer-desc-text">
            The national sanctuary for authentic Pakistani craftsmanship, slow living, and generational heritage.
          </p>
          <div className="social-links-row">
            <span className="social-link">Instagram</span>
            <span>{"\u00B7"}</span>
            <span className="social-link">WhatsApp</span>
            <span>{"\u00B7"}</span>
            <span className="social-link">Facebook</span>
            <span>{"\u00B7"}</span>
            <span className="social-link">YouTube</span>
          </div>
          <div className="regions-text">
            {"Lahore \u00B7 Multan \u00B7 Islamabad \u00B7 Skardu \u00B7 Karachi"}
          </div>
        </div>
      </div>

      {/* Copyright & Certified Badges Footer */}
      <div className="footer-bottom-bar">
        <div>{"\u00A9 2026 Rawayat & Co. (Pvt) Ltd. All Rights Reserved. Document BR-RAW-ECOM-2026-001."}</div>
        <div className="trust-badges-row">
          <span>Easypaisa Certified</span>
          <span>{"\u00B7"}</span>
          <span>JazzCash Integrated</span>
          <span>{"\u00B7"}</span>
          <span>TCS Logistics Partner</span>
        </div>
      </div>
    </footer>
  );
};
