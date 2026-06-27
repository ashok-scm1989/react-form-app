# Team Workflow Guide — react-form-app
### How 3 Developers Work Together Without Breaking Each Other's Code

---

## 1. Team Roles

| Role | Responsibility |
|---|---|
| **Team Lead** | PRD, folder structure, shared/ code, branch protection, PR approvals |
| **Developer 1** | `src/features/auth/` — Registration, Login |
| **Developer 2** | `src/features/dashboard/` — Dashboard and related features |

---

## 2. Project Folder Structure

Each developer owns their folder. Nobody touches another's folder without a Pull Request.

```
src/
  features/
    auth/                  ← Developer 1 ONLY
      Registration.tsx
      Login.tsx
      useAuth.ts
    dashboard/             ← Developer 2 ONLY
      Dashboard.tsx
  shared/                  ← Team Lead manages (PR required to change)
    utils/
      validation.ts        ← validateField() — shared by all
    types/
      auth.types.ts        ← User, RegisterData, LoginData
    AuthContext.tsx         ← isLoggedIn state for whole app
```

**Golden Rule: Work inside your folder. To touch shared/ or another feature, raise a PR.**

---

## 3. Git Branch Strategy

```
main          ← Production only. Direct push BLOCKED.
  └── dev     ← Integration branch. All features merge here first.
        ├── feature/auth        ← Developer 1
        └── feature/dashboard   ← Developer 2
```

### Daily Developer Workflow

```bash
# Day start — always pull latest dev
git checkout dev
git pull origin dev
git checkout feature/auth       # switch to your branch

# Work, commit often
git add src/features/auth/
git commit -m "Add login form validation"
git push origin feature/auth

# When feature is done — raise PR on GitHub
# feature/auth → dev (NOT main)
```

### Merge Rules
- **Feature → dev:** 1 reviewer approval required
- **dev → main:** Team Lead approval required
- **Direct push to main/dev:** BLOCKED via branch protection

---

## 4. CODEOWNERS — Auto Notification System

File: `.github/CODEOWNERS`

```
src/features/auth/        @dev1-github-username
src/features/dashboard/   @dev2-github-username
src/shared/               @teamlead-github-username
.github/                  @teamlead-github-username
```

**How it works:** If Developer 2 touches `src/features/auth/` in a PR,
GitHub automatically notifies Developer 1 and requires their approval before merge.
No manual tagging needed.

---

## 5. Matt Pocock Skills Workflow

### Installation (One-time per machine)
```bash
npx skills@latest add mattpocock/skills --yes --global
```

### How to Build Any Feature (Always follow this order)

```
STEP 1 → /to-prd
         Team Lead runs this ONCE for the whole feature.
         Produces: requirements document, user stories, out-of-scope list.

STEP 2 → /design-an-interface
         Team Lead runs this ONCE.
         Produces: folder structure, interface shapes, shared seams.
         All developers pull this before starting work.

STEP 3 → /tdd  (each developer runs in their own folder)
         Write ONE test → implement minimal code → repeat.
         Never write all tests at once.

STEP 4 → /implement
         Build the feature following the agreed design.
         Claude scans the codebase — will suggest reusing existing functions.

STEP 5 → /review
         Run before raising any Pull Request.
         Catches bugs, duplication, improvements.

STEP 6 → Raise PR → Get approval → Merge to dev
```

### Key Skills Reference

| Skill | When to Use |
|---|---|
| `/to-prd` | New feature or module requirement arrives |
| `/design-an-interface` | Planning folder structure and interfaces |
| `/tdd` | Implementing any function or component |
| `/implement` | Building feature after tests are written |
| `/review` | Before raising a Pull Request |
| `/diagnosing-bugs` | When a bug is found |
| `/ubiquitous-language` | Scan codebase to find existing functions |
| `/resolving-merge-conflicts` | When a merge conflict occurs |
| `/git-guardrails-claude-code` | Set up Git safety rules on your machine |

---

## 6. New Module Requirement Process

When a new feature request arrives (e.g., "Add Profile Page"):

```
Client gives requirement
        ↓
Team Lead runs /to-prd
        ↓
Team Lead runs /design-an-interface
        ↓
Team Lead creates new folder: src/features/profile/
        ↓
Team Lead pushes structure to dev branch
        ↓
All developers: git pull origin dev
        ↓
Assigned developer starts work in their folder only
```

**Nobody starts coding before /to-prd and /design-an-interface are done.**

---

## 7. Shared Code — How to Handle

### If Developer 1 needs a new shared utility:

```
1. Tell team on Slack/standup: "I need validateDate() in shared/"
2. Check first → run /ubiquitous-language to see if it already exists
3. If not exists → write it in src/features/auth/auth.utils.ts first
4. Raise PR to move it to src/shared/utils/
5. Team Lead reviews and merges
6. All developers pull dev → import from shared/
```

### If Developer 2 committed something Developer 1 also needs:

```
Developer 1:
  git pull origin dev           ← get latest code
  /ubiquitous-language          ← Claude scans and finds the function
  import { fn } from "../../shared/utils/..."   ← reuse it
```

**Never duplicate a function. Always check shared/ before writing new ones.**

---

## 8. Daily Standup Checklist (Each Developer)

```
Morning:
  ☐ git pull origin dev
  ☐ Announce in standup which files you will touch today
  ☐ If touching shared/ → inform team first

Before PR:
  ☐ Run /review
  ☐ Run npm test → all tests passing
  ☐ PR description explains what changed and why

When PR is raised:
  ☐ Assign reviewer (CODEOWNERS handles this automatically)
  ☐ Link to the PRD issue
  ☐ Do not merge your own PR
```

---

## 9. Conflict Prevention Rules

| Situation | Rule |
|---|---|
| Need to change another developer's file | Raise PR + get their approval |
| Need to change shared/ | Raise PR + get Team Lead approval |
| Merge conflict occurs | Run `/resolving-merge-conflicts` skill |
| New requirement arrives | Team Lead runs `/to-prd` first — no one starts coding before |
| Found a bug | Run `/diagnosing-bugs` — document it as GitHub issue |
| Don't know if function exists | Run `/ubiquitous-language` — Claude scans entire codebase |

---

## 10. What Claude Does Automatically

When you run `/implement` or `/tdd`, Claude:

- Scans the **entire codebase** before writing new code
- Identifies if a function already exists in another developer's folder
- Suggests moving duplicate code to `shared/`
- Alerts you before touching files outside your folder
- Proposes reusing existing utilities instead of creating new ones

This prevents the biggest team problem: **two developers writing the same code without knowing.**

---

## 11. Quick Reference Card

```
START FEATURE:    /to-prd → /design-an-interface → git pull → your folder
WRITE CODE:       /tdd → /implement → /review → PR
SHARED CHANGE:    Announce → /ubiquitous-language → PR → Team Lead approves
CONFLICT:         /resolving-merge-conflicts
BUG:              /diagnosing-bugs
DAILY:            git pull origin dev every morning
```

---

*Stack: React 19 + TypeScript + Vite | Testing: Vitest | Skills: mattpocock/skills v1.0*
