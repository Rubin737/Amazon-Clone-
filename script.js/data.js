import { currencyCheck } from './additionalFn.js';
export function getProduct(productId){
    let matchItem;

    products.forEach((product) => {
        if (product.id === productId) {
            matchItem = product;
        }
    });                                              
    return matchItem; 
}
 class Products{ //each object
    constructor(productDetails){

    this.id=productDetails.id;
    this.img=productDetails.image;
    this.name=productDetails.name;
    this.rating=productDetails.rating;
    this.priceInCents=productDetails.priceCents;
    this.keywords=productDetails.keywords;
 }
 getStars(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`

 }
 getPriceInCents(){
    return `${currencyCheck(this.priceInCents)}`;
 }
 extraInfoHtml(){
  return  `` 
 }

 


}
class ForCloths extends Products {
   

     constructor(clothDetails){
       super(clothDetails);

       this.type=clothDetails.type;
       this.sizeChartLinklink=clothDetails.sizeChartLink;
    
     }
     extraInfoHtml(){
      return  ` <a class="linki" href="${this.sizeChartLinklink}" target="_blank">
             Fit Check
          </a>
          
        `
     }
}

class ForAppliances extends Products{

    constructor(applianceDetails){
        super(applianceDetails);
        this.instructionsLink=applianceDetails.instructionsLink,
        this.warantyLink=applianceDetails.warantyLink

    }
    extraInfoHtml(){
        return  ` <a class="linki" href="${this.instructionsLink}" target="_blank">

                    Instructions
               
            </a>
            <a class="linki" href="${this.warantyLink}" target="_blank">

                    Warenty Details
               
            </a>
            
          `
       }
}
export let products=[];

export async  function loadUsingFetch(){

  try {
    const promise = await fetch('https://supersimplebackend.dev/products');
    let jsonVal=await promise.json();
    products=jsonVal. map((eachProduct)=>{
     
      if(eachProduct.type==='clothing'){
          return new ForCloths(eachProduct);
      }
      if(eachProduct.type==='appliance'){
          return new ForAppliances(eachProduct);
      }
      
     return  new Products(eachProduct)
  });
  
  } catch (error) {

    console.log('Invalid request',error)
    
  }

  return products

}
// console.log(loadUsingFetch())


export function loadFromBackend(render) {
    
  const xhRequest = new XMLHttpRequest();
  // console.log(xhRequest);
  xhRequest.open('GET', 'https://supersimplebackend.dev/products');
  xhRequest.send();

  xhRequest.addEventListener('load', function () {
    products = JSON.parse(xhRequest.response). map((eachProduct)=>{
     
      if(eachProduct.type==='clothing'){
          return new ForCloths(eachProduct);
      }
      if(eachProduct.type==='appliance'){
          return new ForAppliances(eachProduct);
      }
      
     return  new Products(eachProduct)
  });
  render()
    
  });
  
  // 
   
}



 

// export const products=[
//     {
//         id:'1',
//         img:'images/products/athletic-cotton-socks-6-pairs.jpg',
//         name:' Black and Gray Athletic Cotton Socks - 6 Pairs',
//         rating:{
//             stars:4.5,
//             review:67,
//         },
//         priceInCents:799
        
//     },
//     {
//         id:'2',
//         img:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//         name:' Adults Plain Cotton T-Shirt - 2 Pack',
//         rating:{
//             stars:5.0,
//             review:167,
//         },
//         priceInCents:899,
//         type: "clothing",
//         sizeChartLink: "https://www.snitch.co.in/pages/shirt-size-chart"
//     },
//     {
//         id:'3',
//         img:'images/products/intermediate-composite-basketball.jpg',
//         name:'Intermediate Size Basketball',
//         rating:{
//             stars:4.0,
//             review:4.0,
//         },
//         priceInCents:1099,
        
    
//     },
//     {
//         id: "54e0eccd-8f36-462b-b68a-8182611d9add",
//         img: "images/products/black-2-slot-toaster.jpg",
//         name: "2 Slot Toaster - Black",
//         rating: {
//           stars: 5,
//           review: 2197
//         },
//         priceInCents: 1899,
//         keywords: [
//           "toaster",
//           "kitchen",
//           "appliances"
//         ],
//         type:'appliance',
//         instructionsLink:'https://www.pngegg.com/en/search?q=search+Warrant',
//         warantyLink:'https://www.shutterstock.com/search/home-appliance-warranty',
//       },
//       {
//         id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//         img: "images/products/6-piece-white-dinner-plate-set.jpg",
//         name: "6 Piece White Dinner Plate Set",
//         rating: {
//           stars: 4,
//           review: 37
//         },
//         priceInCents: 2067,
//         keywords: [
//           "plates",
//           "kitchen",
//           "dining"
//         ]
//       },
//       {
//         id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
//         img: "images/products/6-piece-non-stick-baking-set.webp",
//         name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
//         rating: {
//           stars: 4.5,
//           review: 175
//         },
//         priceInCents: 3499,
//         keywords: [
//           "kitchen",
//           "cookware"
//         ],
//         type:'appliance',
//         instructionsLink:'https://www.shutterstock.com/search/appliance-warranty?image_type=vector',
//         warantyLink:'https://www.shutterstock.com/search/home-appliance-warranty',
//       },
//       {
//         id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
//         img: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
//         name: "Plain Hooded Fleece Sweatshirt",
//         rating: {
//           stars: 4.5,
//           review: 317
//         },
//         priceInCents: 2400,
//         keywords: [
//           "hoodies",
//           "sweaters",
//           "apparel"
//         ]
//       },
//       {
//         id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
//         img: "images/products/luxury-tower-set-6-piece.jpg",
//         name: "Luxury Towel Set - Graphite Gray",
//         rating: {
//           stars: 4.5,
//           review: 144
//         },
//         priceInCents: 3599,
//         keywords: [
//           "bathroom",
//           "washroom",
//           "restroom",
//           "towels",
//           "bath towels"
//         ]
//       },
//       {
//         id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
//         img: "images/products/liquid-laundry-detergent-plain.jpg",
//         name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
//         rating: {
//           stars: 4.5,
//           review: 305
//         },
//         priceInCents: 2899,
//         keywords: [
//           "bathroom",
//           "cleaning"
//         ]
//       },
//       {
//         id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
//         img: "images/products/knit-athletic-sneakers-gray.jpg",
//         name: "Waterproof Knit Athletic Sneakers - Gray",
//         rating: {
//           stars: 4,
//           review: 89
//         },
//         priceInCents: 3390,
//         keywords: [
//           "shoes",
//           "running shoes",
//           "footwear"
//         ]
//       },
//       {
//         id: "5968897c-4d27-4872-89f6-5bcb052746d7",
//         img: "images/products/women-chiffon-beachwear-coverup-black.jpg",
//         name: "Women's Chiffon Beachwear Cover Up - Black",
//         rating: {
//           stars: 4.5,
//           review: 235
//         },
//         priceInCents: 2070,
//         keywords: [
//           "robe",
//           "swimsuit",
//           "swimming",
//           "bathing",
//           "apparel"
//         ],
//         type: "clothing",
//         sizeChartLink: "images/clothing-size-chart.png"
//       },
//       {
//         id: "aad29d11-ea98-41ee-9285-b916638cac4a",
//         img: "images/products/round-sunglasses-black.jpg",
//         name: "Round Sunglasses",
//         rating: {
//           stars: 4.5,
//           review: 30
//         },
//         priceInCents: 1560,
//         keywords: [
//           "accessories",
//           "shades"
//         ]
//       },
//       {
//         id: "04701903-bc79-49c6-bc11-1af7e3651358",
//         img: "images/products/women-beach-sandals.jpg",
//         name: "Women's Two Strap Buckle Sandals - Tan",
//         rating: {
//           stars: 4.5,
//           review: 562
//         },
//         priceInCents: 2499,
//         keywords: [
//           "footwear",
//           "sandals",
//           "womens",
//           "beach",
//           "summer"
//         ]
//       },
//       {
//         id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
//         img: "images/products/blackout-curtain-set-beige.webp",
//         name: "Blackout Curtains Set 4-Pack - Beige",
//         rating: {
//           stars: 4.5,
//           review: 232
//         },
//         priceInCents: 4599,
//         keywords: [
//           "bedroom",
//           "curtains",
//           "home"
//         ]
//       },
//       {
//         id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
//         img: "images/products/men-slim-fit-summer-shorts-gray.jpg",
//         name: "Men's Slim-Fit Summer Shorts",
//         rating: {
//           stars: 4,
//           count: 160
//         },
//         priceInCents: 1699,
//         keywords: [
//           "shorts",
//           "apparel",
//           "mens"
//         ]
//       },
//       {
//         id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
//         img: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
//         name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
//         rating: {
//           stars: 5,
//           review: 846
//         },
//         priceInCents: 3074,
//         keywords: [
//           "water boiler",
//           "appliances",
//           "kitchen"
//         ]
//       },
//       {
//         id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
//         img: "images/products/facial-tissue-2-ply-18-boxes.jpg",
//         name: "Ultra Soft Tissue 2-Ply - 18 Box",
//         rating: {
//           stars: 4,
//           review: 99
//         },
//         priceInCents: 2374,
//         keywords: [
//           "kleenex",
//           "tissues",
//           "kitchen",
//           "tissues box",
//           "napkins"
//         ]
//       },
//       {
//         id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
//         img: "images/products/straw-sunhat.webp",
//         name: "Straw Lifeguard Sun Hat",
//         rating: {
//           stars: 4,
//           count: 215
//         },
//         priceInCents: 2200,
//         keywords: [
//           "hats",
//           "straw hats",
//           "summer",
//           "apparel"
//         ]
//       },
//       {
//         id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
//         img: "images/products/sky-flower-stud-earrings.webp",
//         name: "Sterling Silver Sky Flower Stud Earrings",
//         rating: {
//           stars: 4.5,
//           review: 52
//         },
//         priceInCents: 1799,
//         keywords: [
//           "jewelry",
//           "accessories",
//           "womens"
//         ]
//       },
//       {
//         id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
//         img: "images/products/women-stretch-popover-hoodie-black.jpg",
//         name: "Women's Stretch Popover Hoodie",
//         rating: {
//           stars: 4.5,
//           review: 2465
//         },
//         priceInCents: 1374,
//         keywords: [
//           "hooded",
//           "hoodies",
//           "sweaters",
//           "womens",
//           "apparel"
//         ],
//         type: "clothing",
//         sizeChartLink: "images/clothing-size-chart.png"
//       },
//       {
//         id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
//         img: "images/products/bathroom-rug.jpg",
//         name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
//         rating: {
//           stars: 4.5,
//           review: 119
//         },
//         priceInCents: 1250,
//         keywords: [
//           "bathmat",
//           "bathroom",
//           "home"
//         ]
//       },
//       {
//         id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
//         img: "images/products/women-knit-ballet-flat-black.jpg",
//         name: "Women's Knit Ballet Flat",
//         rating: {
//           stars: 4,
//           review: 326
//         },
//         priceInCents: 2640,
//         keywords: [
//           "shoes",
//           "flats",
//           "womens",
//           "footwear"
//         ]
//       },
//       {
//         id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
//         img: "images/products/men-golf-polo-t-shirt-blue.jpg",
//         name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
//         rating: {
//           stars: 4.5,
//           review: 2556
//         },
//         priceInCents: 1599,
//         keywords: [
//           "tshirts",
//           "shirts",
//           "apparel",
//           "mens"
//         ],
//         type: "clothing",
//         sizeChartLink: "images/clothing-size-chart.png"
//       },
//       {
//         id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
//         img: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
//         name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
//         rating: {
//           stars: 4.5,
//           review: 2286
//         },
//         priceInCents: 8300,
//         keywords: [
//           "garbage",
//           "bins",
//           "cans",
//           "kitchen"
//         ],
//         type:'appliance',
//         instructionsLink:'https://www.shutterstock.com/search/appliance-warranty?image_type=vector',
//         warantyLink:'https://www.shutterstock.com/search/home-appliance-warranty',
//       },
//       {
//         id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
//         img: "images/products/duvet-cover-set-blue-twin.jpg",
//         name: "Duvet Cover Set with Zipper Closure",
//         rating: {
//           stars: 4,
//           review: 456
//         },
//         priceInCents: 2399,
//         keywords: [
//           "bedroom",
//           "bed sheets",
//           "sheets",
//           "covers",
//           "home"
//         ]
//       },
//       {
//         id: "d2785924-743d-49b3-8f03-ec258e640503",
//         img: "images/products/women-chunky-beanie-gray.webp",
//         name: "Women's Chunky Cable Beanie - Gray",
//         rating: {
//           stars: 5,
//           review: 83
//         },
//         priceInCents: 1250,
//         keywords: [
//           "hats",
//           "winter hats",
//           "beanies",
//           "tuques",
//           "apparel",
//           "womens"
//         ]
//       },
//       {
//         id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
//         img: "images/products/men-chino-pants-beige.jpg",
//         name: "Men's Classic-fit Pleated Chino Pants",
//         rating: {
//           stars: 4.5,
//           review: 9017
//         },
//         priceInCents: 2290,
//         keywords: [
//           "pants",
//           "apparel",
//           "mens"
//         ]
//       },
//       {
//         id: "1c079479-8586-494f-ab53-219325432536",
//         img: "images/products/men-athletic-shoes-green.jpg",
//         name: "Men's Athletic Sneaker",
//         rating: {
//           stars: 4,
//           review: 229
//         },
//         priceInCents: 3890,
//         keywords: [
//           "shoes",
//           "running shoes",
//           "footwear",
//           "mens"
//         ]
//       },
//       {
//         id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
//         img: "images/products/men-navigator-sunglasses-brown.jpg",
//         name: "Men's Navigator Sunglasses Pilot",
//         rating: {
//           stars: 3.5,
//           review: 42
//         },
//         priceInCents: 1690,
//         keywords: [
//           "sunglasses",
//           "glasses",
//           "accessories",
//           "shades"
//         ]
//       },
//       {
//         id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
//         img: "images/products/non-stick-cooking-set-15-pieces.webp",
//         name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
//         rating: {
//           stars: 4.5,
//           review: 511
//         },
//         priceInCents: 6797,
//         keywords: [
//           "cooking set",
//           "kitchen"
//         ]
//       },
//       {
//         id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
//         img: "images/products/vanity-mirror-silver.jpg",
//         name: "Vanity Mirror with Heavy Base - Chrome",
//         rating: {
//           stars: 4.5,
//           review: 130
//         },
//         priceInCents: 1649,
//         keywords: [
//           "bathroom",
//           "washroom",
//           "mirrors",
//           "home"
//         ]
//       },
//       {
//         id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
//         img: "images/products/women-french-terry-fleece-jogger-camo.jpg",
//         name: "Women's Fleece Jogger Sweatpant",
//         rating: {
//           stars: 4.5,
//           review: 248
//         },
//         priceInCents: 2400,
//         keywords: [
//           "pants",
//           "sweatpants",
//           "jogging",
//           "apparel",
//           "womens"
//         ]
//       },
//       {
//         id: "d339adf3-e004-4c20-a120-40e8874c66cb",
//         img: "images/products/double-elongated-twist-french-wire-earrings.webp",
//         name: "Double Oval Twist French Wire Earrings - Gold",
//         rating: {
//           stars: 4.5,
//           review: 117
//         },
//         priceInCents: 2400,
//         keywords: [
//           "accessories",
//           "womens"
//         ]
//       },
//       {
//         id: "d37a651a-d501-483b-aae6-a9659b0757a0",
//         img: "images/products/round-airtight-food-storage-containers.jpg",
//         name: "Round Airtight Food Storage Containers - 5 Piece",
//         rating: {
//           stars: 4,
//           review: 126
//         },
//         priceInCents: 2899,
//         keywords: [
//           "boxes",
//           "food containers",
//           "kitchen"
//         ]
//       },
//       {
//         id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
//         img: "images/products/coffeemaker-with-glass-carafe-black.jpg",
//         name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
//         rating: {
//           stars: 4.5,
//           review: 1211
//         },
//         priceInCents: 2250,
//         keywords: [
//           "coffeemakers",
//           "kitchen",
//           "appliances"
//         ],
//         type:'appliance',
//         instructionsLink:'https://www.shutterstock.com/search/appliance-warranty?image_type=vector',
//         warantyLink:'https://www.shutterstock.com/search/home-appliance-warranty',

//       },
//       {
//         id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
//         img: "images/products/blackout-curtains-black.jpg",
//         name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
//         rating: {
//           stars: 4.5,
//           review: 363
//         },
//         priceInCents: 3099,
//         keywords: [
//           "bedroom",
//           "home"
//         ]
//       },
//       {
//         id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
//         img: "images/products/cotton-bath-towels-teal.webp",
//         name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
//         rating: {
//           stars: 4.5,
//           review: 93
//         },
//         priceInCents: 2110,
//         keywords: [
//           "bathroom",
//           "home",
//           "towels"
//         ]
//       },
//       {
//         id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
//         img: "images/products/knit-athletic-sneakers-pink.webp",
//         name: "Waterproof Knit Athletic Sneakers - Pink",
//         rating: {
//           stars: 4,
//           review: 89
//         },
//         priceInCents: 3390,
//         keywords: [
//           "shoes",
//           "running shoes",
//           "footwear",
//           "womens"
//         ]
//       },
//       {
//         id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
//         img: "images/products/countertop-blender-64-oz.jpg",
//         name: "Countertop Blender - 64oz, 1400 Watts",
//         rating: {
//           stars: 4,
//           review: 3
//         },
//         priceInCents: 10747,
//         keywords: [
//           "food blenders",
//           "kitchen",
//           "appliances"
//         ],
//         type:'appliance',
//         instructionsLink:'https://www.shutterstock.com/search/appliance-warranty?image_type=vector',
//         warantyLink:'https://www.shutterstock.com/search/home-appliance-warranty',
//       },
//       {
//         id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
//         img: "images/products/floral-mixing-bowl-set.jpg",
//         name: "10-Piece Mixing Bowl Set with Lids - Floral",
//         rating: {
//           stars: 5,
//           review: 679
//         },
//         priceInCents: 3899,
//         keywords: [
//           "mixing bowls",
//           "baking",
//           "cookware",
//           "kitchen"
//         ]
//       },
//       {
//         id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
//         img: "images/products/kitchen-paper-towels-30-pack.jpg",
//         name: "2-Ply Kitchen Paper Towels - 30 Pack",
//         rating: {
//           stars: 4.5,
//           review: 1045
//         },
//         priceInCents: 5799,
//         keywords: [
//           "kitchen",
//           "kitchen towels",
//           "tissues"
//         ]
//       },
//       {
//         id: "bc2847e9-5323-403f-b7cf-57fde044a955",
//         img: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
//         name: "Men's Full-Zip Hooded Fleece Sweatshirt",
//         rating: {
//           stars: 4.5,
//           review: 3157
//         },
//         priceInCents: 2400,
//         keywords: [
//           "sweaters",
//           "hoodies",
//           "apparel",
//           "mens"
//         ],
//         type: "clothing",
//         sizeChartLink: "images/clothing-size-chart.png"
//       }
// ].map((eachProduct)=>{
    
//     if(eachProduct.type==='clothing'){
//         return new ForCloths(eachProduct);
//     }
//     if(eachProduct.type==='appliance'){
//         return new ForAppliances(eachProduct);
//     }
    
//    return  new Products(eachProduct)
// });
// console.log(products)


// function createObjInstance(eachProduct){
 
//    return new Products(eachProduct)

// }
//  export const createObj=products.map(createObjInstance)
// console.log(createObj)// array of class instance
// console.log(products)//array of plain objects

// console.log(products)


