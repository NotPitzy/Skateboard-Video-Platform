export default class Blog {
  constructor(title, authorId, views, createdAt, length, img, bg = null) {
    this.title = title;
    this.authorId = authorId;
    this.views = views;
    this.createdAt = createdAt;
    this.length = length;
    this.img = img;
    this.bg = bg;
  }
}
