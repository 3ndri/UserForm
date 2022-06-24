import {
  Modal,
  Form,
  Button,
  Row,
  Input,
  Col,
  message,
  Checkbox,
} from "antd";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/reducer";
import React, { useState } from "react";

export default ({ isVisible, onCancel }) => {
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const users = useSelector((state) => state.users);
  const usersAmount = users.length;

  const dispatch = useDispatch();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleSubmit = async () => {
    let formData = null;
    try {
      formData = await form.validateFields();
      formData.id = usersAmount + 1;
      formData.coordinates = coordinates;
      dispatch(addUser(formData));
      message.success("User Created!");
      form.setFieldsValue({
        fullName: "",
        username: "",
        email: "",
        phoneNr: "",
        address: "",
        zipCode: "",
        city: "",
        latitude: "",
        longitude: "",
      });
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      width={800}
      visible={isVisible}
      onCancel={onCancel}
      title={"New User Info"}
      footer={
        <Button type="primary" onClick={handleSubmit}>
          Save
        </Button>
      }
    >
      <Form layout={"vertical"} colon={false} form={form} {...layout}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              requiredMark="optional"
              name="fullName"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              requiredMark="optional"
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            >
              <Input placeholder="johndoe123" />
            </Form.Item>
            <Form.Item
              requiredMark="optional"
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter your correct email",
                },
              ]}
            >
              <Input placeholder="johndoe@example.com" />
            </Form.Item>
            <Form.Item
              requiredMark="optional"
              name="phoneNr"
              label="Phone Nr"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(
                    /^\+?(?![^ -]*[ -]{2})(?=(?:[ -]*\d){10,12}$)\d[\d -]*\d$/g
                  ),
                  message: "Please enter your number in correct format",
                },
              ]}
            >
              <Input placeholder="+355691234567" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              requiredMark="optional"
              name="address"
              label={
                <div style={{ display: "flex" }}>
                  <p>Address</p>
                  <Checkbox onChange={() => setIsChecked(!isChecked)}>
                    Use Google Location
                  </Checkbox>
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your address",
                },
              ]}
            >
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Input
                      {...getInputProps({ placeholder: "Type address" })}
                    />

                    <div>
                      {loading ? <div>...loading</div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#41b6e6"
                            : "#fff",
                        };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                    {isChecked && (
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Latitude" name="latitude">
                            <Input
                              onChange={(e) =>
                                setCoordinates({
                                  ...coordinates,
                                  lat: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Longitude" name="longitude">
                            <Input
                              onChange={(e) =>
                                setCoordinates({
                                  ...coordinates,
                                  lng: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              </PlacesAutocomplete>
            </Form.Item>
            <Form.Item
              requiredMark="optional"
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please enter your city",
                },
              ]}
            >
              <Input placeholder="Tirana" />
            </Form.Item>
            <Form.Item
              requiredMark="optional"
              name="zipCode"
              label="Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please enter your zip code",
                },
              ]}
            >
              <Input placeholder="1060" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
