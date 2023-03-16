import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Center,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const BASE_URL =
  "https://beatmapsynth-env.us-east-2.elasticbeanstalk.com/convert";

export default function Home() {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Song is required";
    }
    return error;
  }

  return (
    <>
      <Box bgColor="gray.700">
        <Center height="100vh" bgRepeat={true}>
          <VStack>
            <Heading height={"50px"} color={"whiteAlpha.900"}>
              Beat Map Synthesizer
            </Heading>
            <Formik
              initialValues={{ song: "", difficulty: "normal" }}
              onSubmit={async (values, { resetForm }) => {
                const response = await fetch(
                  `${BASE_URL}/search?url=${values.song}&difficulty=${values.difficulty}`
                );
                console.log(response);
                resetForm();
              }}
            >
              {(props) => (
                <Form>
                  <Box m={2} p={4} bgColor="white" borderRadius={"8px"}>
                    <Field name="song" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.song && form.touched.song}
                        >
                          <FormLabel>Input your song</FormLabel>
                          <Input
                            {...field}
                            placeholder="https://www.youtube.com/..."
                          />
                          <FormErrorMessage>
                            {form.errors.song}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box m={2} p={4} bgColor="white" borderRadius={"8px"}>
                    <Field name="difficulty">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.difficulty && form.touched.difficulty
                          }
                        >
                          <FormLabel as="legend">
                            Select Difficulty Level
                          </FormLabel>
                          <RadioGroup {...field}>
                            <HStack spacing="24px">
                              <Radio {...field} value="easy">
                                Easy
                              </Radio>
                              <Radio {...field} value="normal">
                                Normal
                              </Radio>
                              <Radio {...field} value="hard">
                                Hard
                              </Radio>
                              <Radio {...field} value="expert">
                                Expert
                              </Radio>
                              <Radio {...field} value="expertPlus">
                                ExpertPlus
                              </Radio>
                            </HStack>
                          </RadioGroup>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Center>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      width="30%"
                    >
                      Submit
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </VStack>
        </Center>
      </Box>
    </>
  );
}
