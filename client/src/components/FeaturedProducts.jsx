import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import demo from "../images/demo.png";
import { Link } from "react-router-dom";
function FeaturedProducts({ _id, name, image, price }) {
  return (
    <Grid2
      size={{ xs: 1, md: 1, sm: 1 }}
      // border="1px solid black"
      padding={2}
      justifyContent={"center"}
    >
      <Card sx={{ border: "1px solid black", padding: 2 }}>
        <CardMedia
          component="img"
          image={demo}
          alt="Product Image"
          width={"100%"}
          height={"200px"}
        />
        <CardContent>
          <Link to={`/product/${_id}`}>
            <Typography variant="h6">{name}</Typography>
          </Link>
          <Typography variant="body1">${price}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default FeaturedProducts;
