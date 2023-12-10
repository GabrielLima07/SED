import { Flex } from "@chakra-ui/react";
import ProfileNavBar from "../components/profileNavBar";
import SearchResults from "../components/searchResults";

export default function SearchResultsPage(){
  return(
    <Flex flexDir={"column"}>
      <ProfileNavBar />
      <SearchResults />
    </Flex>
  )
}