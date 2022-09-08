import { Header } from "../components/Header";
import { SidebarSubmission } from "../components/SidebarSubmission";
import { NewSubmissionTopBar } from "../components/NewSubmissionTopBar";

export const CreateSubmission = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-grow">
        <main className="flex-grow bg-gray-100 p-8">
          <section className="flex flex-col items-start max-w-7xl m-auto space-y-8">
            <NewSubmissionTopBar />
            <div className="bg-white rounded-md flex flex-col gap-4 w-full p-8 h-[1200px]">
              <p className="text-2xl font-bold">College - Is it Worth it?</p>
              <div className="flex flex-col gap-4">
                <p>
                  Right now in our society a college education is no longer an
                  option or privilege, but rather a necessity. We are
                  practically raised and conditioned to believe that one needs
                  higher education in order to succeed in life. There is a
                  saying that says "if you think education is expensive, try
                  ignorance." But as technology is constantly advancing and
                  computers are running almost anything, is a college education
                  really necessary? There are people whom have never set foot in
                  a college and are doing better than people
                  <span className="text-blue-600 animate-pulse duration-75">
                    |
                  </span>
                </p>
              </div>
            </div>
          </section>
        </main>
        <SidebarSubmission />
      </div>
    </div>
  );
};
