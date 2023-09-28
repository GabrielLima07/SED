import { Box } from '@chakra-ui/react';
import WithSubnavigation from "../components/navbar";
import SplitScreen from '../components/pagesection';
import Trending from '../components/trending';

export default function Homepage() {
  return(
    <Box>
      <WithSubnavigation />
      <SplitScreen />
      <Trending />
    </Box>
  )
}