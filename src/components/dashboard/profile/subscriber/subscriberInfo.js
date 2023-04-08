const SubscriberInfo = ({ subscriberProfileData }) => {
  const className = "text-lg font-bold";
  return (
    <div className="w-auto">
      <p className="mt-2 ml-4 mr-4">
        <span className="text-lg font-bold">About:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.about}
        </span>
      </p>
      <p className="mt-2 ml-4 mr-4">
        <span className="text-lg font-bold">Height:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.height}
        </span>
      </p>
      <p className="mt-2 ml-4 mr-4">
        <span className="text-lg font-bold">Weight:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.weight}
        </span>
      </p>
      <p className="mt-2 ml-4 mr-4">
        <span className="text-lg font-bold">Goals:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.goals}
        </span>
      </p>
      <p className="mt-2 ml-4 mr-4">
        <span className="text-lg font-bold">Lifestyle:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.lifestyle}
        </span>
      </p>
      <p className="mt-2 ml-4 mr-4 mb-2">
        <span className="text-lg font-bold">Preferred Workout:</span>
        <span className="text-lg ml-2">
          {subscriberProfileData.mode}
        </span>
      </p>
    </div>
  )
}

export default SubscriberInfo;