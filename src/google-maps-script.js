const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_CLOUD_API_KEY}&libraries=places`;
script.async = true;
document.head.appendChild(script);
