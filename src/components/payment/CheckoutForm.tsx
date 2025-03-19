"use client";
import { baseUrl } from "@/utils/baseUrl";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city"; // Import the country-state-city package

interface CheckoutFormProps {
  price: string;
  serviceId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, serviceId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = Number(price);

  const [error, setError] = useState<string | undefined>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [useCityDropdown, setUseCityDropdown] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Get all countries
  const allCountries = Country.getAllCountries();

  // Get states based on the selected country
  const states = State.getStatesOfCountry(country);

  // Get cities based on the selected state
  const cities = City.getCitiesOfState(country, state);

  // Check if city data is available for the selected state
  useEffect(() => {
    if (country && state) {
      const cityData = City.getCitiesOfState(country, state);
      if (cityData.length === 0) {
        setUseCityDropdown(false); // Switch to text input if no city data is available
        setCity(""); // Reset city value
      } else {
        setUseCityDropdown(true); // Use dropdown if city data is available
      }
    }
  }, [country, state]);

  const stripeIntent = async () => {
    const res = await fetch(`${baseUrl}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: totalPrice }),
    });
    const data = await res.json();
    return data.clientSecret;
  };

  useEffect(() => {
    if (price) {
      stripeIntent().then((clientSecret) => {
        setClientSecret(clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      setError("Please fill out all card details.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
      billing_details: {
        email,
        name: `${firstName} ${lastName}`,
        phone,
        address: { country, state, city, postal_code: postalCode },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      // Get full names for country, state, and city
      const selectedCountry = allCountries.find((c) => c.isoCode === country);
      const selectedState = states.find((s) => s.isoCode === state);
      const selectedCity = cities.find((c) => c.name === city);

      const booking = {
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        service_id: serviceId,
        amount: totalPrice,
        date: new Date().toISOString(), // Ensure the date is in ISO string format
        transaction_id: paymentIntent.id,
        status: "paid",
        country: selectedCountry ? selectedCountry.name : country, // Save full country name
        state: selectedState ? selectedState.name : state, // Save full state name
        city: selectedCity ? selectedCity.name : city, // Save full city name
        postal_code: postalCode,
      };

      const res = await fetch(`${baseUrl}/create-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await res.json();
      if (data.acknowledged) {
        toast.success("Successfully Ordered");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        {/* Full-width form fields with labels */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border w-full h-12 p-4 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border w-full h-12 p-4 rounded-md"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full h-12 p-4 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border w-full h-12 p-4 rounded-md"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border text-sm w-full h-12 p-2 rounded-md"
                required
              >
                <option value="">Select Country</option>
                {allCountries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border w-full h-12 text-sm p-2 rounded-md"
                required
                disabled={!country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              {useCityDropdown ? (
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border w-full text-sm h-12 p-2 rounded-md"
                  required
                  disabled={!state}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border w-full h-12 p-4 rounded-md"
                  required
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="border w-full h-12 p-4 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <div className="border w-full h-12 p-4 rounded-md">
                <CardNumberElement />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiration Date
              </label>
              <div className="border w-full h-12 p-4 rounded-md">
                <CardExpiryElement />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVC</label>
              <div className="border w-full h-12 p-4 rounded-md">
                <CardCvcElement />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md mt-6 cursor-pointer"
          disabled={!stripe || !clientSecret}
        >
          {isLoading ? <h1>Loading</h1> : <h1>Pay</h1>}
        </button>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
