import React, { useState, useEffect } from "react";
import Modal from "@/common/Modal";
import CustomInput from "@/common/FormElements/CustomInput";
import SingleSelect from "@/common/FormElements/SingleSelect";
import Button from "@/common/Button";
import Image from "next/image";
import { EditIcon } from "../Icons";
import apiClient from "@/utils/apiClient";
import { FaPlus } from "react-icons/fa";
import { Delete } from "@mui/icons-material";
import Loader from "../Loader";
import { useRef } from 'react'
import { MdSettings } from "react-icons/md";
import Drawer from "@/common/Drawer";
import DeleteAccount from "../DeleteAccount";
import toast from "react-hot-toast";
import { useAuthUser } from "@/utils/useAuthUser";
import { deleteFile, uploadFile } from "@/utils/uploadFile";

// Define interfaces for user data
export interface IAddress {
  country: string;
  state: string;
  city: string;
  pinCode: string;
  area: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: IAddress[];
}

export interface ICardItem {
  key: string;
  label: string;
  value: string;
}

export interface IInformationProps {
  title: string;
  icon: string;
  cardItems: any;
  height: string;
  cardHeight?: string;
  handleInputChange?: any;
}

export default function ProfileView() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false)
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const fileInputRef = useRef<any>(null);


  const triggerFileInput = () => {
    fileInputRef.current.click();

  }
  const [profile, setProfile] = useState('')
  const { user, userId, isAuthenticated } = useAuthUser();
  const [settingOpen, setSettingOpen] = useState(false)

  // Set default states to avoid changing hook order
  const [personalInformation, setPersonalInformation] =
    useState<IInformationProps>({
      title: "Personal Information",
      icon: "/profileview/Information.png",
      height: "h-auto",
      cardHeight: "h-auto",
      cardItems: [],
    });

  const [addressInformation, setAddressInformation] =
    useState<IInformationProps>({
      title: "Address Information",
      icon: "/profileview/Gps.png",
      height: "h-[526px]",
      cardHeight: "h-[259px]",
      cardItems: [],
    });

  const [passwordDetails, setPasswordDetails] = useState({
    title: "Password Details",
    icon: "/profileview/Password.png",
    height: "h-[408px]",
    cardHeight: "h-[173px]",
    cardItems: [
      { key: "currentPassword", label: "Current password", value: "" },
      { key: "newPassword", label: "New password", value: "" },
      {
        key: "confirmNewPassword",
        label: "Confirm new password",
        value: "",
      },
    ],
  });

  const fetchUserData = async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      const res = await apiClient.get(`${apiClient.URLS.user}/${userId}`);
      if (res?.status === 200) {
        setUserData(res?.body);
        setProfile(res?.body?.profile);

        // Update state after data is fetched
        setPersonalInformation((prev) => ({
          ...prev,
          cardItems: [
            {
              key: "firstname",
              label: "First name",
              value: res?.body?.firstName,
            },
            { key: "lastname", label: "Last name", value: res.body.lastName },
            {
              key: "emailaddress",
              label: "Email Address",
              value: res?.body?.email,
            },
            {
              key: "phonenumber",
              label: "Phone number",
              value: res.body.phone,
            },
            { key: "youare", label: "You are", value: "Owner" },

          ],
        }));

        setAddressInformation((prev) => ({
          ...prev,
          cardItems: res.body.addresses
            .sort((a: any, b: any) => a.id - b.id)
            .map((address: any, index: number) => [
              {
                key: `${address.id}_address_area`,
                label: "Area",
                value: address.area,
              },
              {
                key: `${address.id}_address_city`,
                label: "City",
                value: address.city,
              },
              {
                key: `${address.id}_address_state`,
                label: "State",
                value: address.state,
              },
              {
                key: `${address.id}_address_country`,
                label: "Country",
                value: address.country,
              },
              {
                key: `${address.id}_address_pinCode`,
                label: "Pin Code",
                value: address.pinCode,
              },
            ]),
        }))
        setLoading(false)
        toast.success("User data fetched successfully");
      };
    } catch (error) {
      setLoading(false)
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserData();
    }
  }, [isAuthenticated, userId]);


  const handleSettingsIcon = () => {
    setSettingOpen(!settingOpen)
  }

  if (loading) {
    return <div><Loader /></div>;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (loading) return;
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true)
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, "userprofiles");

        if (uploadedUrl) {
          setProfile(uploadedUrl);
        } else {
          console.error("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      finally {
        setLoading(false);
      }
    }
  };
  const handleDelete = async () => {
    if (!profile) return;
    setLoading(true);

    try {
      await deleteFile(profile);
      setProfile('');
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("error deleting file");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    key: string,
    value: string,
    title: string,
    id?: number
  ) => {
    if (title === "Personal Information") {
      setPersonalInformation((prevInfo: any) => ({
        ...prevInfo,
        cardItems: prevInfo.cardItems.map((item: any) => {
          return item.key === key ? { ...item, value: value } : item;
        }),
      }));
    } else if (title === "Address Information") {
      setAddressInformation((prev) => {
        const updatedCardItems = prev.cardItems.map((items: any) => {
          return items.map((item: any) =>
            item.key === key ? { ...item, value: value } : item
          );
        });

        return {
          ...prev,
          cardItems: [...updatedCardItems],
        };
      });
    } else if (title === "Password Details") {
      setPasswordDetails((prev) => ({
        ...prev,
        cardItems: prev.cardItems.map((item: any) => {
          return item.key === key ? { ...item, value: value } : item;
        })
      }))
    }
  };

  const handleSaveProfile = async (e: any) => {
    e.preventDefault()
    const res = await apiClient.patch(`${apiClient.URLS.user}/${user?.id}/update-personal-info`, {
      profile
    })
    if (res.status === 200) {
      setOpenProfileModal(false)
    }
  }

  return (
    <>
      <div className="flex flex-col md:gap-6 gap-3 md:p-4  p-2">
        <div className="flex flex-col md:gap-6 gap-3">
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-[18px] md:text-[24px] font-Gordita-Bold text-gray-800">
              My Profile
            </h1>
            <div>
              <Button
                onClick={handleSettingsIcon}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MdSettings size={24} className="text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 md:p-4  p-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative md:h-[100px] md:w-[100px] h-[50px] w-[50px]">
                <Image
                  src={profile ? profile : "/profileview/Avatar.png"}
                  fill
                  priority
                  alt="avatar"
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="key-text font-Gordita-Medium text-gray-900">
                  {
                    personalInformation.cardItems.find(
                      (item: any) => item.key === "firstname"
                    )?.value
                  }{" "}
                  {
                    personalInformation.cardItems.find(
                      (item: any) => item.key === "lastname"
                    )?.value
                  }
                </h1>
                <p className="text-gray-500 mt-1 label-text">Owner</p>
              </div>
            </div>
            <div>
              <Button
                className="px-2 md:py-1 py-[2px] rounded-lg border border-[#2872a1] text-[#2872a1] hover:bg-blue-50 transition-colors"
                onClick={() => {
                  setOpenProfileModal(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <EditIcon />
                  <span className="md:text-sm text-[12px] font-Gordita-Medium">Edit</span>
                </div>
              </Button>
            </div>

            {openProfileModal && (
              <Modal
                isOpen={openProfileModal}
                closeModal={() => setOpenProfileModal(false)}
                className="max-w-md"
              >
                <div className="md:p-4  p-2">
                  <h1 className="text-lg font-Gordita-Medium text-gray-900 mb-6">
                    Profile Picture
                  </h1>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative h-32 w-32 mb-4">
                      <Image
                        src={profile ? profile : "/profileview/Avatar.png"}
                        layout="fill"
                        alt="avatar"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="flex justify-between items-center mb-6">
                    <div
                      className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                      onClick={triggerFileInput}
                    >
                      <Image
                        src="/profileview/camera.png"
                        width={20}
                        height={20}
                        alt="camera"
                      />
                      <span className="text-sm font-Gordita-Medium">
                        {profile ? "Change Photo" : "Upload Photo"}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    {profile && (
                      <div
                        className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-700"
                        onClick={handleDelete}
                      >
                        <Image
                          src="/profileview/delete.png"
                          width={20}
                          height={20}
                          alt="delete"
                        />
                        <span className="text-sm font-Gordita-Medium">Delete</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      className="bg-[#2872a1]hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-Gordita-Medium"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 gap-6">
            <CardContainer
              title={personalInformation.title}
              icon={personalInformation.icon}
              cardItems={personalInformation.cardItems}
              height={personalInformation.height}
              handleInputChange={handleInputChange}
            />

            <CardContainer
              title={addressInformation.title}
              icon={addressInformation.icon}
              cardItems={addressInformation.cardItems}
              height={addressInformation.height}
              handleInputChange={handleInputChange}
            />

            <CardContainer
              {...passwordDetails}
              handleInputChange={handleInputChange}
            />
          </div>

          <Drawer
            open={settingOpen}
            handleDrawerToggle={handleSettingsIcon}
            closeIconCls="text-gray-600"
            openVariant="right"
            panelCls="w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex flex-col h-full md:p-4  p-2">
              <div className="flex-1 flex items-center justify-center">
                <DeleteAccount />
              </div>
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-Gordita-Medium hover:bg-gray-400 transition-colors"
                  onClick={() => setSettingOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
}

const CardContainer = ({
  title,
  icon,
  cardItems,
  height,
  handleInputChange,
}: IInformationProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [cardItemsState, setCardItemsState] = useState<any>(cardItems);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditClick = (address: any) => {
    setSelectedAddress(address);
    setOpenModal(true);
  };

  const handleAddAddressClick = () => {
    setSelectedAddress([
      {
        key: `${99999}_address_area`,
        label: "Area",
        value: "",
      },
      {
        key: `${99999}_address_city`,
        label: "City",
        value: "",
      },
      {
        key: `${99999}_address_state`,
        label: "State",
        value: "",
      },
      {
        key: `${99999}_address_country`,
        label: "Country",
        value: "",
      },
      {
        key: `${99999}_address_pinCode`,
        label: "Pin Code",
        value: "",
      },
    ]);
    setOpenModal(true);
  };

  useEffect(() => {
    setCardItemsState(cardItems);
  }, [cardItems]);

  const onPersonalInfoSave = async () => {
    setIsLoading(true);
    const payLoad = {
      email: cardItemsState.find((item: any) => item.key === "emailaddress")
        .value,
      firstName: cardItemsState.find((item: any) => item.key === "firstname")
        .value,
      lastName: cardItemsState.find((item: any) => item.key === "lastname")
        .value,
      phone: cardItemsState.find((item: any) => item.key === "phonenumber")
        .value,
    };
    try {
      const res = await apiClient.patch(
        `${apiClient.URLS.user}/5/update-personal-info`,
        { ...payLoad }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e: any, key: string) => {
    setSelectedAddress((prev: any) => {
      return prev.map((item: any) => {
        return item.key === key ? { ...item, value: e.target.value } : item;
      });
    });
  };

  const onAddresInfoSave = async () => {
    setIsLoading(true);
    const updatedCardItems = cardItemsState.map((address: any) => {
      return address.map((item: any) => {
        const selectedItem = selectedAddress.find(
          (selected: any) => selected.key === item.key
        );
        return selectedItem ? { ...item, value: selectedItem.value } : item;
      });
    });

    // Handle new addresses
    const newItems = selectedAddress.filter((selected: any) => {
      return !updatedCardItems.some((address: any) =>
        address.some((item: any) => item.key === selected.key)
      );
    });

    if (newItems.length) {
      const newAddress = newItems.map((item: any) => ({
        ...item,
        key: `99999_${item.key.split("_")[2]}`, // Assign '99999' for new address keys
      }));
      updatedCardItems.push(newAddress);
    }

    // Prepare the payload
    const newAddressesPayload: any = [];
    const updatedAddressesPayload: any = [];

    updatedCardItems.forEach((cardItems: any) => {
      const idString = cardItems[0].key.split("_")[0];
      const id = isNaN(parseInt(idString, 10)) ? null : parseInt(idString, 10);

      const addressPayload = cardItems.reduce((acc: any, item: any) => {
        const key = item.key.split("_").pop(); // Extract the last part of the key (e.g., 'area', 'city', etc.)
        acc[key] = item.value;
        return acc;
      }, {});

      if (!id || id === 99999) {
        newAddressesPayload.push(addressPayload);
      } else {
        addressPayload.id = id;
        updatedAddressesPayload.push(addressPayload);
      }
    });

    try {
      if (newAddressesPayload.length > 0) {
        for (const address of newAddressesPayload) {
          const res = await apiClient.post(
            `${apiClient.URLS.address}/5`,
            address
          );
        }
      }

      if (updatedAddressesPayload.length > 0) {
        const updatePromises = updatedAddressesPayload.map(
          async (address: any) => {
            const res = await apiClient.patch(
              `${apiClient.URLS.address}/5/${address.id}`,
              address
            );
            return res.data;
          }
        );

        const updatedResults = await Promise.all(updatePromises);
      }

      setOpenModal(false);
      setCardItemsState(updatedCardItems);
    } catch (error) {
      console.error("Error saving address information:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteAddress = async (id: string) => {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId) || addressId === 99999) {
      console.error("Invalid address ID. Cannot delete.");
      return;
    }

    // Remove from the backend
    try {
      await apiClient.delete(`${apiClient.URLS.address}/5/${addressId}`);
      console.log(`Address with ID ${addressId} deleted.`);

      // Update the local state by filtering out the deleted address
      const updatedCardItems = cardItemsState.filter((cardItems: any) => {
        const idString = cardItems[0].key.split("_")[0];
        return parseInt(idString, 10) !== addressId;
      });

      // Update the state
      setCardItemsState(updatedCardItems);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSubmit = async () => {
    if (title === "Personal Information") {
      await onPersonalInfoSave();
    } else if (title === "Password Details") {
      await onPasswordInfoSave();
    }
    setOpenModal(false);
  };

  const onPasswordInfoSave = async () => {
    setIsLoading(true)
    const payLoad = {
      currentPassword: cardItemsState.find(
        (item: any) => item.key === "currentPassword"
      ).value,
      newPassword: cardItemsState.find(
        (item: any) => item.key === "newPassword"
      ).value,
      confirmPassword: cardItemsState.find(
        (item: any) => item.key === "confirmNewPassword"
      ).value,
    };

    try {
      const res = await apiClient.post(
        `${apiClient.URLS.user}/5/change-password`,
        { ...payLoad }
      );

      handleInputChange("currentPassword", "", "Password Details");
      handleInputChange("newPassword", "", "Password Details");
      handleInputChange("confirmNewPassword", "", "Password Details");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between md:px-6 px-2 md:py-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Image src={icon} alt="information" width={20} height={20} priority />
          <span className="font-Gordita-Medium text-gray-900 ">
            {title}
          </span>
        </div>

        <Button
          className=" px-2 md:py-1 py-[2px] rounded-lg border border-[#2872a1] text-[#2872a1] hover:bg-blue-50 transition-colors"
          onClick={() => {
            if (title === "Address Information") {
              handleAddAddressClick();
            } else {
              setOpenModal(true);
            }
          }}
        >
          <div className="flex items-center gap-2">
            {title !== "Address Information" ? (
              <EditIcon />
            ) : (
              <FaPlus className="text-[#2872a1]" size={12} />
            )}
            <span className="md:text-sm text-[12px] font-Gordita-Medium">
              {title !== "Address Information" ? "Edit" : "Add"}
            </span>
          </div>
        </Button>
      </div>

      <div className="md:p-4  p-2">
        {title === "Address Information" ? (
          cardItemsState.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {cardItemsState.map((addressArray: any, index: number) => {
                return (
                  <div
                    key={index}
                    className=" rounded-lg relative w-full"
                  >
                    <div className="grid key-text md:grid-cols-4 grid-cols-2 gap-4 mb-4">
                      {addressArray.map((address: any) => {
                        return (
                          <div
                            key={address.key}
                            className="flex flex-col gap-1"
                          >
                            <div className=" text-gray-500">
                              {address.label}
                            </div>
                            <div className="text-gray-900 font-Gordita-Medium">
                              {address.value || "-"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        className="px-3 md:py-1 py-[2px] rounded-md border border-[#2872a1] text-[#2872a1] md:text-sm text-[12px] hover:bg-blue-50"
                        onClick={() => handleEditClick(addressArray)}
                      >
                        <div className="flex items-center gap-1">
                          <EditIcon />
                          <span>Edit</span>
                        </div>
                      </Button>
                      <Button
                        className="px-3 md:py-1 py-[2px] rounded-md border border-red-500 text-red-500 md:text-sm  text-[12px] hover:bg-red-50"
                        onClick={() =>
                          onDeleteAddress(addressArray[0].key.split("_")[0])
                        }
                      >
                        <div className="flex items-center gap-1">
                          <Delete className="text-red-500 w-4 h-4" />
                          <span>Delete</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No Saved Addresses
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
            {cardItemsState.map((item: any) => (
              <div
                key={item.key}
                className="flex key-text flex-col md:gap-1"
              >
                <div className=" text-gray-500">
                  {item.label}
                </div>
                <div className="text-gray-900 font-Gordita-Medium">
                  {item.label.includes("password") ? "••••••••" : item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for editing address or personal info */}
      {openModal && (
        <Modal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          className="max-w-3xl"
        >
          <div className="md:p-4  p-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={icon}
                alt="information"
                width={24}
                height={24}
                priority
              />
              <h2 className="text-xl font-Gordita-Medium text-gray-900">
                {title}
              </h2>
            </div>

            {/* Conditional rendering for address fields */}
            {title === "Address Information" && selectedAddress ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedAddress.map((item: any, index: number) => (
                    <div key={item.key} className="flex flex-col gap-2">
                      <label className="text-sm font-Gordita-Medium text-gray-700">
                        {item.label} <span className="text-red-500">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        name={item.key}
                        rootCls="bg-white"
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2872a1] focus:border-[#2872a1]"
                        onChange={(e) => handleAddressChange(e, item.key)}
                        value={item.value}
                      />
                    </div>
                  ))}
                </div>
                <Button
                  className="bg-[#2872a1]hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-Gordita-Medium"
                  onClick={onAddresInfoSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Address"}
                </Button>
              </>
            ) : (
              // Render personal info fields as before
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {cardItemsState.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label className="text-sm font-Gordita-Medium text-gray-700">
                        {item.label}
                        {item.key !== "youare" && <span className="text-red-500">*</span>}
                      </label>
                      {item.key === "youare" ? (
                        <SingleSelect
                          type="single-select"
                          name={item.key}
                          selectedOption={item.value}
                          options={[
                            { id: 1, service: "Owner" },
                            { id: 2, service: "Tenant" },
                          ]}
                          optionsInterface={{
                            isObj: true,
                            displayKey: "service",
                          }}
                          buttonCls="w-full h-12 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <CustomInput
                          type={
                            item.key === "emailaddress"
                              ? "email"
                              : item.key.includes("password")
                                ? "password"
                                : item.key === "phonenumber"
                                  ? "number"
                                  : "text"
                          }
                          name={item.key}
                          rootCls={`${item.key === "emailaddress" ? 'bg-gray-100' : 'bg-white'}`}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2872a1] focus:border-[#2872a1]"
                          value={item.value}
                          onChange={(e) =>
                            handleInputChange(item.key, e.target.value, title)
                          }
                          disabled={item.key === "emailaddress"}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleSubmit}
                  className="bg-[#2872a1]hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-Gordita-Medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};