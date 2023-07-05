"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useAtom } from "jotai";
import { songData } from "../store/store";
import { useRouter } from "next/navigation";
const TextInputComponent = ({ onTextSubmit }: any) => {
  const router = useRouter();
  const [text, setText] = useState(`Yeah, yeah
Yeah
Finally got a reason I can stay home
Pretty little thing for me to wait on
Fuckin' you all day until the day gone
California King that we can play on (Play on, yeah)
Girl, you know I like it when you naked and you shake it
In my face and I can't take it (Take-take, oh no)
FaceTime makes me anxious
And she looks so fuck, I can taste it
Grind me, don't stop it, you should be in tropics
Tannin' your body, yeah, 'til it get dark, milk chocolate
You should be famous, movies like Nia, Lathan
You know I've been the best man, yeah-yeah
Back keep flowin', hit the gas, keep goin'
Yeah, them girls on tour goin' city after city
Real ass bitch, give a fuck 'bout a nigga
If she did, then she wouldn't be goin' city after city
Brand new Benz, never asked her how she get it
Made a couple racks, I never asked her how she did it
City girls love to have fun in the city
City girls love to have fun in the city (Yeah)
City girl like to let you fuck on her titty, yeah (Ayy)
City girl like to let you blam on her titty (Titty)
City girls like to stare and act so saditty
I know city girls like a nigga dark skin and pretty (Oh)
All I wanna do is have fun in the city (All I want to do)
All I want for you to do is leave your friends and get missin' (Oh)
All I wanna do is keep it real with your pimpin', baby (Real, okay)
Long as you don't switch up when you blow and get your millions, ayy
Bad, bad bitch, feed her Percocets and Adderall (Bad, bad)
Test, test, gotta cuff her, yeah
Let's make a cause (You're a bad, bad bitch)
Keep it simple with you
Everything you want is boss (Yeah, you want it all)
Let you shop, my bank account, you get your Black Card (Yeah, on God)
I don't know where I'd be if I wouldn't
Fuck with you, baby (Don't know where I'd be)
Is you in this picture?
I don't see nothin' but you, baby (I don't see nobody else)
Bad, bad baby, she from Singapore (Yeah, yeah)
You ain't got a ring, you'll get one for Easter, yeah (Hey)
Back keep flowin', hit the gas, keep goin'
Yeah, them girls on tour goin' city after city
Real ass bitch, give a fuck 'bout a nigga
If she did, then she wouldn't be goin' city after city
Brand new Benz, never asked her how she get it
Made a couple racks, I never asked her how she did it (Yeah)
City girls love to have fun in the city
City girls love to have fun in the city (Ayy)
Finally, I wanted to be faithful
Usually, I wouldn't even say so
I swear she can give the Devil a halo
I know she only tryna get a bankroll
I don't mind
I don't mind (Yeah, yeah)
You can't get anybody to stop me, yeah
You ain't got anybody, you got me, yeah-yeah
Grind me, don't stop it (Yeah), you should be in tropics
Tannin' your body, yeah, 'til it get dark, milk chocolate
You should be famous, movies like Nia, Lathan
You know I've been the best man, yeah-yeah (Ooh)
Back keep flowin', hit the gas, keep goin'
Yeah, them girls on tour goin' city after city
Real ass bitch, give a fuck 'bout a nigga
If she did, then she wouldn't be goin' city after city
Brand new Benz, never asked her how she get it (Oh-oh)
Made a couple racks, I never asked her how she did it (Oh-woah)
City girls love to have fun in the city (Yeah-yeah)
City girls love to have fun in the city (Oh-oh)
City girls love to have fun in the city
City girls love to have fun in the city
Hahahahaha`);
  const [songInfo, setSongInfo] = useAtom(songData);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await axios.post("/api/processtext", formData);

      // console.log(response.data);
      setSongInfo(response.data);

      form.reset();
    } catch (error) {
      console.error(error);
    }
    router.push("/results");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="songLyrics"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter your song lyrics here..."
        rows={5}
        cols={40}
      ></textarea>
      <div className="flex justify-between">
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            setText("");
          }}
          type="button"
        >
          clear
        </button>
      </div>
    </form>
  );
};

export default TextInputComponent;
