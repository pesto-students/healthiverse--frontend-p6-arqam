import ProfileInfo from "../info";

const SubscriberInfo = ({ subscriberProfileData }) => {
  const items = [
    { heading: "Height:", value: subscriberProfileData.height },
    { heading: "Weight:", value: subscriberProfileData.weight },
    { heading: "Goals:", value: subscriberProfileData.goals },
    { heading: "Lifestyle:", value: subscriberProfileData.lifestyle },
  ];

  return (
    <div className="w-auto">
      <ProfileInfo items={items} />
      <div className="mb-2" />
    </div>
  )
}

export default SubscriberInfo;