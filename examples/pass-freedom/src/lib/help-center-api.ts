import { request, withLanguageHeader } from "@boxo/api";
import {
  HelpCenterArticle,
  HelpCenterCategory,
  HelpCenterListResourceType,
} from "@boxo/api/lounge";

const HELP_CENTER_MINIAPP = "freedom-fast-track";

export const getHelpCenterList = async (locale?: string) => {
  const { data } = await request.get<HelpCenterCategory[]>(
    `/api/v1/help-center/${HELP_CENTER_MINIAPP}/`,
    {
      params: {
        resource_type: HelpCenterListResourceType.FAST_TRACK,
      },
      headers: locale ? withLanguageHeader(locale) : undefined,
    },
  );

  return data;
};

export const getHelpCenterArticle = async (
  articleId: string,
  locale?: string,
) => {
  const { data } = await request.get<HelpCenterArticle>(
    `/api/v1/help-center/${HELP_CENTER_MINIAPP}/articles/${articleId}/`,
    {
      headers: locale ? withLanguageHeader(locale) : undefined,
    },
  );

  return data;
};
