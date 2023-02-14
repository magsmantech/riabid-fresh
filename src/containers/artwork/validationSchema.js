import * as yup from "yup";
import jwt_decode from "jwt-decode";
import { getJwt } from "../../services/authService";

if (getJwt()) {
  var { account_type } = jwt_decode(getJwt());
  var is_gallery = account_type === 3 ? true : false;
}
export const validationSchema = yup.object().shape({
  title: yup.string().required(),
  is_gallery: yup.boolean().default(is_gallery),
  artist_id: yup.string().required(),
  product_type: yup.string().required(),
  buy_it_now: yup
    .number()
    .when("is_gallery", {
      is: false,
      then: yup.number().min(1, "Minimum price is 1 GEL"),
    })
    .required(),
  description: yup.string().required(),
  year: yup.string().required(),
  category_id: yup.string().required(),
  depth: yup.string().required(),
  height: yup.string().required(),
  medium: yup.string().required(),
  units: yup.string().required(),
  width: yup.string().required(),
  request_price: yup.string().required(),
});
