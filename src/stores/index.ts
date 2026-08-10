
import { configureStore } from "@reduxjs/toolkit"
import SectionReducers from "./slices/sections"
import GlobalSettingReducers from "./slices/global"
import SocialReducers from "./slices/social"
import ProfileReducers from "./slices/profile"
import PortfolioReducers from "./slices/portfolio"
import SkillsReducers from "./slices/skills"
import ExperienceReducers from "./slices/experience"
import BlogReducers from "./slices/blog"


export const store = configureStore({
    reducer: {
        section: SectionReducers,
        global: GlobalSettingReducers,
        social: SocialReducers,
        profile: ProfileReducers,
        portfolio: PortfolioReducers,
        skills: SkillsReducers,
        experience: ExperienceReducers,
        blog: BlogReducers,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



