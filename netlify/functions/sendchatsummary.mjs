import fetch from 'node-fetch';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const { chatContent } = JSON.parse(event.body);
  if (!chatContent) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'chatContent' in request" }),
    };
  }

  try {
    const response = await fetch('https://us-central1-listenformypostmessage.cloudfunctions.net/postHandler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatContent }),
    });

    const responseBody = await response.text();

    return {
      statusCode: response.status,
      body: responseBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
