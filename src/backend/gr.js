import goodreads from "goodreads-api-node";
import _ from "lodash";

//Объект, хранящий ключи приложения
const grObject = {
  set gr(gr) {
    this.grObj = gr;
  },
  get gr() {
    if (!_.has(this, 'grObj'))
      this.gr = goodreads({
        key: process.env.GOODREADS_KEY,
        secret: process.env.GOODREADS_SECRET_KEY
      });
    return this.grObj;
  }
};

export default grObject;