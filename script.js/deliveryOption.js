import dayJs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';

 export const deliveryOption=[
    {
        deliveryId:'1',
        deliveryDays:7,
        priceInCents:0

    },
    {
        deliveryId:'2',
        deliveryDays:3,
        priceInCents:499

    },
    {
        deliveryId:'3',
        deliveryDays:1,
        priceInCents:999

    },
];
export function getDeliveryOption(deliveryId){
    let storeItem;
    deliveryOption.forEach((eachOption) => {
        if(eachOption.deliveryId === deliveryId){
            storeItem = eachOption;
        }
    });
    return storeItem || deliveryOption[0]; // Corrected the fallback to deliveryOption[0]
}
export function calculateDeliveryDate(storeItem){
    
  
    const date=dayJs();
    const deliveryDate=date.add(storeItem.deliveryDays,'days');
    
    const format=deliveryDate.format('dddd, MMMM D ');
    return format;
}

