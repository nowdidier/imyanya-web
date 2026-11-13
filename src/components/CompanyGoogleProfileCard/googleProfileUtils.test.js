import test from "node:test";
import assert from "node:assert/strict";

import {
  buildGoogleProfileUrls,
  normalizeCompanyForGoogleProfile,
} from "./googleProfileUtils.js";

test("buildGoogleProfileUrls builds valid Google Search, Maps, Reviews, Photos, and Jobs URLs", () => {
  const urls = buildGoogleProfileUrls({
    companyName: "Bank of Kigali",
    address: "BK Building, KN 4 Ave",
    city: "Kigali",
    district: "Nyarugenge",
    lat: -1.9441,
    lng: 30.0619,
    websiteUrl: "www.bk.rw",
    industry: "Banking",
  });

  assert.match(urls.profileSearchUrl, /^https:\/\/www\.google\.com\/search\?q=Bank%20of%20Kigali%20Kigali/);
  assert.match(urls.directionsUrl, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=Bank%20of%20Kigali%2C%20-1\.9441%2C30\.0619/);
  assert.match(urls.reviewsUrl, /reviews/);
  assert.match(urls.photosUrl, /tbm=isch/);
  assert.match(urls.jobsUrl, /udm=8&jbr=sep:0/);
  assert.equal(urls.websiteUrl, "https://www.bk.rw");
  assert.equal(urls.websiteHost, "bk.rw");
});

test("buildGoogleProfileUrls falls back to address query when coordinates are absent", () => {
  const urls = buildGoogleProfileUrls({
    companyName: "Blinkbuy Rwanda",
    address: "KG 11 Ave",
    city: "Kigali",
  });

  assert.match(
    urls.directionsUrl,
    /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=Blinkbuy%20Rwanda%2C%20KG%2011%20Ave%2C%20Kigali%2C%20Rwanda$/
  );
  assert.equal(urls.websiteUrl, null);
});

test("normalizeCompanyForGoogleProfile normalizes live API companyDetail and drops default placeholder assets", () => {
  const normalized = normalizeCompanyForGoogleProfile({
    companyDetail: {
      slug: "blinkbuy-rwanda",
      companyName: "blinkbuy rwanda",
      fieldOperation: "ecommerce buying and selling",
      description: "<p>Online store in <strong>Kigali</strong>.</p>",
      companyImageUrl:
        "https://res.cloudinary.com/dswnatoh2/image/upload/v1/myjob-bucket/system/company_logo_default.png",
      companyCoverImageUrl:
        "https://res.cloudinary.com/dswnatoh2/image/upload/v1/myjob-bucket/system/company_cover_image_default.jpg",
      websiteUrl: "https://blinkbuy.rw",
      companyEmail: "hello@blinkbuy.rw",
      companyPhone: "+250788000000",
      since: "2022-05-10",
      jobPostNumber: 3,
      location: { address: "KN 5 Rd", lat: -1.95, lng: 30.06 },
      companyImages: [
        { imageUrl: "https://cdn.example.com/office-1.jpg" },
        {
          imageUrl:
            "https://res.cloudinary.com/dswnatoh2/image/upload/v1/myjob-bucket/system/company_logo_default.png",
        },
      ],
    },
    cityName: "Kigali",
    employeeSizeLabel: "10-49 employees",
  });

  assert.equal(normalized.companyName, "blinkbuy rwanda");
  assert.equal(normalized.fullLocation, "KN 5 Rd, Kigali, Rwanda");
  assert.equal(normalized.logoUrl, null);
  assert.equal(normalized.coverUrl, null);
  assert.deepEqual(normalized.images, ["https://cdn.example.com/office-1.jpg"]);
  assert.equal(normalized.foundedLabel, "2022");
  assert.equal(normalized.jobPostNumber, 3);
  assert.equal(normalized.isRegistered, true);
});

test("normalizeCompanyForGoogleProfile normalizes directoryCompany with ratings and HQ", () => {
  const normalized = normalizeCompanyForGoogleProfile({
    directoryCompany: {
      id: "bank-of-kigali",
      slug: "bank-of-kigali",
      companyName: "Bank of Kigali",
      industry: "Banking & Financial Services",
      tagline: "Rwanda's leading commercial bank",
      description: "<p>Leading commercial bank in Rwanda.</p>",
      companySize: "1000+",
      foundedYear: 1966,
      website: "https://www.bk.rw",
      email: "info@bk.rw",
      phone: "+250 788 149 300",
      headquarters: {
        city: "Kigali",
        district: "Nyarugenge",
        address: "BK Building, KN 4 Ave",
        latitude: -1.9441,
        longitude: 30.0619,
      },
      employeeReviews: {
        overallRating: 4.1,
        reviewCount: 87,
        pros: ["Strong brand", "Training programs", "Career progression", "Extra"],
      },
    },
  });

  assert.equal(normalized.companyName, "Bank of Kigali");
  assert.equal(
    normalized.fullLocation,
    "BK Building, KN 4 Ave, Nyarugenge, Kigali, Rwanda"
  );
  assert.equal(normalized.rating, 4.1);
  assert.equal(normalized.reviewCount, 87);
  assert.equal(normalized.pros.length, 3);
  assert.equal(normalized.isRegistered, false);
});

test("normalizeCompanyForGoogleProfile avoids duplicating Kigali or Rwanda in full addresses", () => {
  const normalized = normalizeCompanyForGoogleProfile({
    companyDetail: {
      slug: "blinkbuy-rwanda",
      companyName: "blinkbuy rwanda",
      location: {
        address: "13, KG 17 Avenue, Kinunga, Kigali, Gasabo, Kigali City, Rwanda",
      },
    },
    cityName: "City of Kigali",
  });

  assert.equal(
    normalized.fullLocation,
    "13, KG 17 Avenue, Kinunga, Kigali, Gasabo, Kigali City, Rwanda"
  );
});
