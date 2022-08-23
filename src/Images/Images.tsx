import "./Images.css";
import Carousel from 'react-material-ui-carousel'
import tokenizer from "../tokenizer";

interface Props {
  imageList: { url: string, name: string }[];
  className?: string;
}

export default function ImageView({ imageList }: Props) {
  return (
    <Carousel
      fullHeightHover
      autoPlay
      stopAutoPlayOnHover
      swipe
      animation="slide"
      duration={800}
      sx={{
        minWidth: "90vw"
      }}
      indicators={false}
    >
      {
        tokenizer.shuffle(imageList).map(({url, name}, i) => (
          <img src={url} alt={name} key={i} width="100%" height="200vw" className="Image"/>
        ))
      }
    </Carousel>
  );
}