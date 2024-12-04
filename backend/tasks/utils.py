from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI(api_key="")  # Replace with your actual OpenAI API key

def query_chatgpt(prompt):
    try:
        # Stream Chat Completion Response
        stream = client.chat.completions.create(
            model="gpt-4",  # Ensure this model is available for your account
            messages=[
                {"role": "system", "content": "You are an AI task scheduler."},
                {"role": "user", "content": prompt},
            ],
            stream=True,
        )

        # Collect the streamed chunks into the full response
        result = ""
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                result += chunk.choices[0].delta.content

        return result.strip()

    except Exception as e:
        raise RuntimeError(f"Error querying ChatGPT: {str(e)}")