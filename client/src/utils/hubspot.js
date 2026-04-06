export async function submitToHubSpot(data) {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
  const formId = import.meta.env.VITE_HUBSPOT_FORM_ID;

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: [
          { name: "firstname", value: data.firstName },
          { name: "lastname", value: data.lastName },
          { name: "email", value: data.email },
          { name: "phone", value: data.phone },
          { name: "message", value: data.message },
        ],
        context: {
          pageUri: window.location.href,
          pageName: "Contact Page",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("HubSpot submission failed");
  }

  return await response.json();
}
