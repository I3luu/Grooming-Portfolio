// All of Kacey's site copy lives here. Items marked TODO still need real info.

export const profile = {
  name: 'Kacey Yount',
  brand: 'Kacey Studies Coats',
  role: 'Pet Groomer',
  location: 'St. Louis / IL area',
  tagline: 'Your pet groomer. Thoughtful, hand-scissored grooms for pups of every size, at their own pace.',
  instagram: 'https://www.instagram.com/kaceystudiescoats',
  instagramHandle: '@kaceystudiescoats',
  phone: '', // TODO: add phone number (hidden while empty)
  email: '', // TODO: add email (hidden while empty)
  heroImage: 'images/kaceyimg.jpg',
};

export const about = {
  image: 'images/img9.jpg',
  paragraphs: [
    'Kacey Yount has been grooming dogs throughout the Illinois and Missouri area for 7 years. She got her start at PetSmart, where she built the foundation of skills that shaped her into the groomer she is today, and now brings that experience to Wolfgang’s Pet Stop.',
    'Kacey has a soft spot for Asian fusion cuts, blending creativity and precision into every trim, and she especially loves working with double-coated breeds, understanding the extra care and technique their coats call for. Looking ahead, she’s working toward her National Certified Master Groomer certification as she continues to grow her craft.',
  ],
  highlights: [
    { big: '7 yrs', small: 'grooming in IL & MO' },
    { big: 'Wolfgang’s', small: 'Pet Stop' },
    { big: 'NCMG', small: 'certification in progress' },
  ],
};

export type Photo = { src: string; alt: string; caption?: string };

export const gallery: Photo[] = [
  { src: 'images/img1.jpg', alt: 'Full groom on a tricolor pup in a blue bandana', caption: 'Full Groom' },
  { src: 'images/img2.jpg', alt: 'Bath and tidy on a Yorkie', caption: 'Bath & Tidy' },
  { src: 'images/img3.jpg', alt: 'Fluffy cream pup after a first groom', caption: 'Puppy’s First Cut' },
  { src: 'images/img4.jpg', alt: 'Smiling Shih Tzu after a groom' },
  { src: 'images/img5.jpg', alt: 'Teddy bear cut on a white doodle' },
  { src: 'images/img6.jpg', alt: 'Little terrier mix after a tidy' },
  { src: 'images/img8.jpg', alt: 'Fluffy white pup with a bow' },
  { src: 'images/img10.jpg', alt: 'Pomeranian standing on the grooming table' },
  { src: 'images/img11.jpg', alt: 'Sheltie in a blue bandana' },
  { src: 'images/img13.jpg', alt: 'Shih Tzu with a red bow' },
  { src: 'images/img7.jpg', alt: 'Doodle with a fresh body trim' },
];

export const beforeAfter = [
  { before: 'images/before.jpg', after: 'images/after.jpg' },
  { before: 'images/before1.jpg', after: 'images/after1.jpg' },
];

export const specialties = {
  paragraphs: [
    'I specialize in double-coated breeds (Huskies, Shepherds, Goldens and the like) with careful de-shedding and hand scissoring that keeps their coat healthy instead of just cutting corners.',
    'Every groom moves at the dog’s pace, whether that’s a nervous rescue who needs extra patience or a puppy getting their very first cut.',
  ],
  tags: ['Double coats', 'De-shedding', 'Hand scissoring', 'Asian fusion cuts', 'Nervous rescues', 'Puppy firsts'],
  images: [
    { src: 'images/img14.jpg', alt: 'Big dog after a groom' },
    { src: 'images/img12.jpg', alt: 'Small fluffy dog with butterfly clips' },
  ],
};

// TODO: real client testimonials. While this list is empty, the section shows "coming soon".
export const testimonials: { quote: string; name: string; pet?: string }[] = [];
