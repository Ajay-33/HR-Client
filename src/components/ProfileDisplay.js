import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDisplay = ({ location }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(location.search);
      const accessToken = params.get('access_token');
      if (accessToken) {
        try {
          const response = await axios.get(`http://localhost:3000/api/linkedin/profile?access_token=${accessToken}`);
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching LinkedIn profile data:', error);
        }
      }
    };
    fetchProfile();
  }, [location]);

  return (
    <div className="profile-display">
      {profile ? (
        <div>
          <h2>{profile.localizedFirstName} {profile.localizedLastName}</h2>
          <p>{profile.headline}</p>
          {/* Additional LinkedIn data like experience and education */}
        </div>
      ) : (
        <p>Loading LinkedIn profile data...</p>
      )}
    </div>
  );
};

export default ProfileDisplay;
