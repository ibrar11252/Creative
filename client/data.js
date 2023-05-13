
const express=require('express')
const fs = require('fs');
const path = require('path');

// Get the absolute path to popular_1.png relative to data.js
// const imagePath = path.join(__dirname, 'imagesbck', 'popular_1.png');
// // Read the contents of popular_1.png as a buffer
// const imageBuffer = fs.readFileSync(imagePath);

// const imageBase64 = Buffer.from(imageBuffer).toString('base64');







// Array of image filenames
const imageFilenames = ['popular_1.png', 'popular_2.png', 'popular_3.png',
'popular_4.png', 'popular_5.png', 'popular_6.png',
'popular_7.png', 'popular_8.png'
];

// Array to store base64-encoded image buffers
const imageBuffers = [];

// Loop through the image filenames and read their contents as buffers
imageFilenames.forEach((filename) => {
  const imagePath = path.join(__dirname, 'imagesbck', filename);
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = Buffer.from(imageBuffer).toString('base64');
  imageBuffers.push(imageBase64);
});




const popularProducts = [
    {
      id:1,
      // img:require("./imagesbck/popular_1.png"),
      imageBase64: imageBuffers[0],
    // imageBase64: imageBase64,
      // img:"https://cdn.shopify.com/s/files/1/0556/6467/2934/products/doubleshots2_c6f31732-079b-4485-b0f8-cf650bbb8662_360x.jpg?v=1664474036",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:4500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    }
    ,
    {
      id:2,
      imageBase64: imageBuffers[1],
      // img:"https://cdn.shopify.com/s/files/1/0556/6467/2934/products/PLM07086copy_360x.jpg?v=1668758064",title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:9500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:3,
      imageBase64: imageBuffers[2],
      // img:"https://cdn.shopify.com/s/files/1/0556/6467/2934/products/PLM04765copy_360x.jpg?v=1666598214",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:8500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:4,
      imageBase64: imageBuffers[3],
      // img:"https://i0.wp.com/leathershub.com/wp-content/uploads/2020/10/6.png?resize=420%2C420&ssl=1",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:2500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:5,
      imageBase64: imageBuffers[4],
      // img:"https://i0.wp.com/leathershub.com/wp-content/uploads/2021/10/1-2.png?resize=420%2C420&ssl=1",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:7500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:6,
      imageBase64: imageBuffers[5],
      // img:"https://i0.wp.com/leathershub.com/wp-content/uploads/2019/05/4.png?resize=420%2C420&ssl=1",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:3500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:7,
      imageBase64: imageBuffers[6],
      // img:"https://cdn.shopify.com/s/files/1/0535/0506/5136/products/MW0872-010MW0872-010_1_400x.png?v=1663053563",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:6500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
    {
      id:8,
      imageBase64: imageBuffers[7],
      // img:"https://cdn.shopify.com/s/files/1/0535/0506/5136/products/MW0018-034_OLIVE_1_400x.png?v=1661851513",
      title:"Handmade shoes",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut.",

      price:5500,
      size:[6,7,8,9,10,11,12],
      color:["black","brown","yellow"]
    },
  ]

  module.exports=popularProducts