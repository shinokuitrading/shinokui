import type { Locale } from "@/i18n/config";
import type { ManufacturerProductDetails as Details } from "@/lib/products";

type Props = {
  details: Details;
  locale: Locale;
  title: string;
  subtitle: string;
  specificationsLabel: string;
  staffVoiceTitle: string;
};

export function ManufacturerProductDetails({
  details,
  locale,
  title,
  subtitle,
  specificationsLabel,
  staffVoiceTitle
}: Props) {
  const isJapanese = locale === "ja";
  const intro = isJapanese ? details.intro_ja ?? details.intro : details.intro;
  const storyTitle = isJapanese
    ? details.story_title_ja ?? details.story_title
    : details.story_title;
  const story = isJapanese ? details.story_ja ?? details.story : details.story;
  const staffVoice = isJapanese
    ? details.staff_voice_ja ?? details.staff_voice
    : details.staff_voice;

  return (
    <section
      aria-labelledby="manufacturer-description-title"
      className="mt-6 border-t border-oceanBrown/15 pt-6"
    >
      <div>
        <h2
          id="manufacturer-description-title"
          className="font-serif text-lg text-textDark"
        >
          {title}
        </h2>
        <p className="mt-1 text-xs tracking-[0.2em] text-oceanBrown">
          {subtitle}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-sm leading-relaxed text-textMuted">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-base text-textDark">{storyTitle}</h3>
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-textMuted">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-oceanBrown/20">
        <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
          <caption className="sr-only">{specificationsLabel}</caption>
          <tbody>
            {details.specifications.map((specification) => (
              <tr
                key={specification.label_ja ?? specification.label}
                className="border-b border-oceanBrown/15 last:border-b-0"
              >
                <th
                  scope="row"
                  className="w-[38%] break-words bg-oceanBrown/5 px-3 py-2.5 align-top font-medium text-textDark sm:px-4"
                >
                  {isJapanese
                    ? specification.label_ja ?? specification.label
                    : specification.label}
                </th>
                <td className="break-words px-3 py-2.5 text-textMuted sm:px-4">
                  {isJapanese
                    ? specification.value_ja ?? specification.value
                    : specification.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="border-b border-oceanBrown/50 pb-2 font-serif text-sm text-oceanBrown">
          {staffVoiceTitle}
        </h3>
        <div className="mt-4 space-y-2 text-sm leading-relaxed text-textMuted">
          {staffVoice.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
