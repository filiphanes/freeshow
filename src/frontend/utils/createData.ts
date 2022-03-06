import { remotePassword, showsPath } from "./../stores"
import { get } from "svelte/store"
import { setShow } from "../components/helpers/setShow"
import { audioFolders, dictionary, folders, mediaFolders, projects, shows, templates } from "../stores"
import { save } from "./save"

export function createData(paths: any) {
  if (!get(shows).default) {
    setShow("default", {
      name: get(dictionary).example?.welcome || "Welcome",
      category: "presentation",
      settings: {
        activeLayout: "default",
        template: "default",
      },
      timestamps: {
        created: new Date("2022-01-01").getTime(),
        modified: null,
        used: null,
      },
      meta: {},
      slides: {
        1: {
          group: "",
          color: null,
          settings: {},
          notes: "",
          items: [
            {
              style: "top:428.50px;left:208.50px;height:220px;width:1500px;",
              align: "",
              lines: [{ align: "", text: [{ value: (get(dictionary).example?.welcome || "Welcome") + "!", style: "font-size: 180px;font-weight: bold;" }] }],
            },
          ],
        },
      },
      layouts: {
        default: {
          name: "",
          notes: "",
          slides: [{ id: "1" }],
        },
      },
      media: {},
    })
  }

  folders.update((a) => {
    a.default = { name: get(dictionary).example?.meetings || "Meetings", parent: "/" }
    return a
  })
  projects.update((a) => {
    a.default = {
      name: get(dictionary).example?.example || "Example",
      notes: get(dictionary).example?.example_note || "Write notes here",
      created: new Date("2022-01-01").getTime(),
      parent: "default",
      shows: [{ id: "default" }],
    }
    return a
  })
  // TODO: translate templates
  templates.update((a) => {
    a.default = {
      name: "Title",
      color: null,
      category: "song",
      items: [
        {
          style: "top:428.50px;left:208.50px;height:220px;width:1500px;",
          align: "",
          lines: [{ align: "", text: [{ value: "Template", style: "font-size: 180px;font-weight: bold;" }] }],
        },
      ],
    }
    return a
  })
  // TODO: get folders
  mediaFolders.update((a) => {
    a.pictures = { name: "category.pictures", icon: "folder", path: paths.pictures, default: true }
    a.videos = { name: "category.videos", icon: "folder", path: paths.videos, default: true }
    return a
  })
  audioFolders.update((a) => {
    a.music = { name: "category.music", icon: "folder", path: paths.music, default: true }
    return a
  })
  showsPath.set(paths.shows)

  remotePassword.set(randomNumber(1000, 9999).toString())

  save()
}

const randomNumber = (from: number, to: number): number => Math.floor(Math.random() * to - from) + from
