import { styled, withExpoSnack } from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import LoginSpotify from "./Components/LoginSpotify";

const StyledView = styled(View);
const StyledText = styled(Text);

const Home = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <LoginSpotify/>
    </StyledView>
  );
};

export default withExpoSnack(Home);


// const apiCall = async (code: string) => {
//   try {
//     const bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcwNDM2MzA1MiwiZXhwIjoxNzA0MzY2NjUyfQ.AB6MVOMmBa7UODygKuQgI7hRfUsq6W3AZh-j20mHVLU"

//     const response = await fetch(process.env.EXPO_PUBLIC_API_URL + REGISTER_TOKEN_ROUTE, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${bearer}`,
//       },
//       body: JSON.stringify({code: code}),
//     });
//     console.log(response)
//     if (!response.ok) {
//       const error = await response.json();
//       console.log(error)
//       throw new Error(error.error);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// } 

// try {
          // apiCall(code)
        // } catch(error) {
            // console.log(error)
        // }

