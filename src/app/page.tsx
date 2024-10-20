import { getServerSession } from "next-auth";
import { MeetupListing } from '@/components/MeetupListing';
import SignInButton from "@/components/SignInButton";
import { BottomMenu } from "@/components/BottomMenu";
import { CreateNewButton } from "@/components/CreateNewButton";
import { IsDemo } from "@/services/utls";

export default async function Home() {

  const session = await getServerSession();

  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      <div className='flex flex-col justify-center items-center'>
        <img className='w-60' src="./umbMeetupCoord.webp" />
        <h1 className='mb-8 font-extrabold text-2xl'>Umbraco Meetup Co-ordinator</h1>
      </div>
      {session || IsDemo() ? (
        <>
          <MeetupListing />
          <BottomMenu>
            <CreateNewButton/>
          </BottomMenu>
        </>
      ) : (
        <SignInButton/>
      )}
    </main>
  );
}