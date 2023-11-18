import React, { useState } from 'react';

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-page">
        <img src="logo.png" alt="Logo" />
      </div>
    );
  } else {
    return this.props.children;
  }
}

