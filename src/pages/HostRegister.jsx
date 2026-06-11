import React, { useState } from "react";
import "./HostRegister.css";

export default function HostRegister() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="host-page">
      <div className="host-container">

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        <h1 className="host-heading">
          Become a <span>Host Family</span>
        </h1>

        <p className="host-subtitle">
          Share your culture, home and experiences with travellers.
        </p>

        {step === 1 && (
          <div className="step-card">
            <h2>Step 1 - Basic Details</h2>

            <input placeholder="Family Name" />
            <input placeholder="Contact Number" />
            <input placeholder="Email Address" />
          </div>
        )}

        {step === 2 && (
          <div className="step-card">
            <h2>Step 2 - Location</h2>

            <input placeholder="State" />
            <input placeholder="City" />
            <input placeholder="Full Address" />
          </div>
        )}

        {step === 3 && (
          <div className="step-card">
            <h2>Step 3 - Family Information</h2>

            <input placeholder="Number of Family Members" />
            <input placeholder="Languages Spoken" />
            <textarea
              placeholder="Describe your family and culture..."
            ></textarea>
          </div>
        )}

        {step === 4 && (
          <div className="step-card">
            <h2>Step 4 - Hosting Details</h2>

            <input placeholder="Price Per Night (₹)" />
            <input placeholder="Available Rooms" />
            <input placeholder="Amenities (WiFi, Food, Parking)" />
          </div>
        )}

        {step === 5 && (
          <div className="step-card">
            <h2>Step 5 - Review & Submit</h2>

            <p>
              Review all details before submitting your host application.
            </p>

            <button className="submit-btn">
              Submit Application
            </button>
          </div>
        )}

        <div className="buttons">
          {step > 1 && (
            <button className="back-btn" onClick={prevStep}>
              Back
            </button>
          )}

          {step < 5 && (
            <button className="next-btn" onClick={nextStep}>
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
}