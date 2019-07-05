const mockData = [
  { id: 12, name: 'Voyagers', destination: 'New York, New York', picture: 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg' },
  { id: 13, name: 'Sparkers', destination: 'Osaka, Japan', picture: 'https://photos.smugmug.com/Osaka/Osaka-Categories/i-J9MFjBv/0/XL/Osaka_Districts-XL.jpg' },
  { id: 14, name: 'Language Lovers', destination: 'San Francisco, California', picture: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg' },
  { id: 15, name: 'Not a travel tinder app', destination: 'Vancouver, Canada', picture: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_463,q_50,w_800/v1/clients/vancouverbc/01014_201809_AlbertNormandin_False_CreekVancouverDowntownCityAerial_23dd1724-bfd7-4cc9-9d93-60faac3cb2fa.jpg' },
  { id: 16, name: 'Ya Mama', destination: 'Edinburgh, Scotland', picture: 'http://www.visitscotland.com/cms-images/attractions/edinburgh-skyline-calton-hill?view=Standard' }
];

const mockTrips = [
  { id: 20, name: 'The Hobbits', destination: 'Queenstown, New Zealand', picture: 'https://www.noted.co.nz/media/13444/ls4611237_28_aspen_gi_84184157.jpg?width=501&height=374' },
  { id: 21, name: 'Partiers', destination: 'Las Vegas, Nevada', picture: 'http://res.cloudinary.com/simpleview/image/upload/v1497480003/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg' },
];

const mockUsers = [
  { id: 1, name: 'Harry Potter', email: 'look-at-my-cool-scar@wizards.com', picture: 'https://images.ctfassets.net/bxd3o8b291gf/3SQ3X2km8wkQIsQWa02yOY/25f258f21bdbe5f552a4419bb775f4f0/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=1200', groupIds: [12, 14]},
  { id: 2, name: 'Voldemort', email: 'noseless@wizards.com', picture: 'https://www.gannett-cdn.com/-mm-/1d10b02c47124839540f95461e99b239519c4db7/c=364-0-2508-1206/local/-/media/2017/02/09/USATODAY/usatsports/vol4.jpg?width=3200&height=1680&fit=crop', groupIds: [12, 14, 15]},
  { id: 3, name: 'Ron Weasley', email: 'whiney@wizards.com', picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg', groupIds: [13, 14, 16]},
  { id: 4, name: 'Hermione Granger', email: 'smarter-than-you@wizards.com', picture: 'https://images-na.ssl-images-amazon.com/images/I/81Z9f1Kos%2BL._SY679_.jpg', groupIds: [13, 14]},
];

module.exports = {
  mockData,
  mockTrips,
  mockUsers
};