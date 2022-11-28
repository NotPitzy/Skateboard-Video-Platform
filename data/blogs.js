import { Blog } from "../models/index.js";

const blogs = [
  new Blog(
    "How to do Basic Jumping and how to landing safely",
    1,
    53164,
    new Date(2022, 10, 20),
    420,
    "https://assets.codepen.io/3364143/skate-removebg-preview.png",
    "#31AABC"
  ),
  new Blog(
    "Skateboard Tips You need to know",
    2,
    43781,
    new Date(2022, 10, 23),
    300,
    "https://c0.anyrgb.com/images/1020/945/venice-beach-2018-outdoors-sport-men-jumping-desert-sunset-extreme-sports-one-person-action.jpg"
  ),
];

export default blogs;
