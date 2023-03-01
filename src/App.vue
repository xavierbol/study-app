<template>
  <router-view />
</template>

<style lang="scss">
// Large Screen - 1000 and more screen size
@mixin lg-screen {
  @media only screen and (min-width: 1000px) {
    @content;
  }
}

// Medium Screen - 768 to 999 screen size
@mixin md-screen {
  @media only screen and (max-width: 999px) {
    @content;
  }
}

// Small Screen - 575 to 767 screen size
@mixin sm-screen {
  @media only screen and (max-width: 790px) {
    @content;
  }
}

// Mobile Screen - below 575 screen size
@mixin xs-screen {
  @media only screen and (max-width: 575px) {
    @content;
  }
}

@for $i from 1 through 12 {
  .col-#{$i} {
    width: calc(100% / 12 * #{$i});
  }
}

@for $i from 1 through 10 {
  .m-#{$i} {
    margin: #{$i}rem;
  }

  .ml-#{$i} {
    margin-left: #{$i}rem;
  }

  .mr-#{$i} {
    margin-right: #{$i}rem;
  }

  .mt-#{$i} {
    margin-top: #{$i}rem;
  }

  .mb-#{$i} {
    margin-bottom: #{$i}rem;
  }

  .p-#{$i} {
    padding: #{$i}rem;
  }

  .pl-#{$i} {
    padding-left: #{$i}rem;
  }

  .pr-#{$i} {
    padding-right: #{$i}rem;
  }

  .pt-#{$i} {
    padding-top: #{$i}rem;
  }

  .pb-#{$i} {
    padding-bottom: #{$i}rem;
  }
}

.spacer {
  flex: 1 1 auto;
}

.w-full {
  width: 100%;
}

.w-screen {
  width: 100vh;
}

.h-full {
  height: 100%;
}

.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-center {
  justify-content: center;
}

.justify-evenly {
  justify-content: space-evenly;
}

.justify-end {
  justify-content: flex-end;
}

.items-center {
  align-items: center;
}

.row {
  display: flex;
  width: 100%;
  margin-bottom: 3rem;

  @include sm-screen {
    flex-direction: column;

    .nes-field {
      width: 100%;

      margin-right: 0;
      margin-bottom: 3rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

tr.dashed-border-bottom > td {
  border-bottom: dashed;
  border-color: black;
}

.buttons {
  margin-top: 2rem;

  @include xs-screen {
    display: flex;
    flex-wrap: wrap;

    :last-child {
      margin: 1rem auto;
    }
  }
}

.menu button:not(.float-btn),
a:not(.float-btn) {
  width: 300px;
}
</style>
